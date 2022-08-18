import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../../../http"
import IRestaurante from "../../../interfaces/IRestaurante"
import ITag from "../../../interfaces/ITag"

export default function FormularioPrato() {

    const [nomePrato, setNomePrato] = useState('')
    const [descricaoPrato, setDescricaoPrato] = useState('')
    const [tagPrato, setTagPrato] = useState('')
    const [restaurante, setRestaurante] = useState('')
    const [imagem, setImagem] = useState< File | null>(null)
    
    const parametros = useParams()

    const [ listaTags, setListaTags ] = useState<ITag[]>([])
    const [ listaRestaurantes, setListaRestaurantes ] = useState<IRestaurante[]>([])

    useEffect(() => {
        http.get<{ tags: ITag[] }>('tags/')
            .then(resposta => setListaTags(resposta.data.tags))
            .catch (error => console.log(error))

        http.get<IRestaurante[]>('restaurantes/')
            .then(resposta => setListaRestaurantes(resposta.data))
            .catch (error => console.log(error))


        if (parametros.id) {
            http.get(`pratos/${parametros.id}/`)
                .then(resposta => {
                    setNomePrato(resposta.data.nome)
                    setDescricaoPrato(resposta.data.descricao)
                    setTagPrato(resposta.data.tag)
                })
                .catch(error => console.log(error))
        }
    }, [parametros])

    const selecionarArquivo = ( evento: React.ChangeEvent<HTMLInputElement>) => {
        if (evento.target.files?.length) {
            setImagem( evento.target.files[0] )
        } else {
            setImagem (null)
        }
    }

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        const formData = new FormData()
        formData.append( 'nome', nomePrato )
        formData.append( 'descricao', descricaoPrato )
        formData.append( 'tag', tagPrato )
        formData.append( 'restaurante', restaurante )
        if( imagem ){
            formData.append( 'imagem', imagem )
        }

        http.request({
            url: 'pratos/',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
        .then( () => alert('Prato cadastrado com sucesso!'))
        .catch( error => console.log(error) )
    }

    return (



        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component='h1' variant='h6'>Formulário Prato</Typography>
            <Box sx={{ mt: 5, width: '100%' }} component='form' onSubmit={aoSubmeterForm}>
                <TextField
                    variant="standard"
                    label='Nome'
                    margin="dense"
                    fullWidth
                    required
                    value={nomePrato}
                    onChange={evento => setNomePrato(evento.target.value)} />

                <TextField
                    variant="standard"
                    label='Descricao'
                    margin="dense"
                    fullWidth
                    required
                    value={descricaoPrato}
                    onChange={evento => setDescricaoPrato(evento.target.value)} />

                <FormControl margin="dense" fullWidth >
                    <InputLabel id='select-tag'>Tag</InputLabel>
                    <Select labelId="select-tag" value={tagPrato} onChange={ evento => setTagPrato(evento.target.value) }>
                        {listaTags.map( tag => <MenuItem key={tag.id} value={tag.value}>{tag.value}</MenuItem>)}
                    </Select>
                </FormControl>

                <FormControl margin="dense" fullWidth >
                    <InputLabel id='select-restaurante'>Restaurante</InputLabel>
                    <Select labelId="select-restaurante" value={restaurante} onChange={ evento => setRestaurante(evento.target.value) }>
                        {listaRestaurantes.map( restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>{restaurante.nome}</MenuItem>)}
                    </Select>
                </FormControl>


                <input type='file' onChange={selecionarArquivo} />


                <Button sx={{ marginTop: 5 }} variant="outlined" type="submit" fullWidth>Salvar</Button>
            </Box>
        </Box>

    )
}