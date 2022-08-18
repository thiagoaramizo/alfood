
import { Box, Button, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../../../http"

export default function FormularioRestaurante() {

    const parametros = useParams()

    useEffect(() => {
        if (parametros.id) {
            http.get(`restaurantes/${parametros.id}/`)
                .then(resposta => {
                    setNomeRestaurante(resposta.data.nome)
                })
                .catch(error => console.log(error))
        }
    }, [parametros])

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (parametros.id) {
            http.put(`restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert('Cadastrado com sucesso!')
                })
                .catch(error => console.log(error))
        } else {
            http.post('restaurantes/', {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert('Cadastrado com sucesso!')
                })
                .catch(error => console.log(error))
        }
    }

    return (



        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component='h1' variant='h6'>Formulário Restaurante</Typography>
            <Box sx={{ mt: 5, width: '100%' }} component='form' onSubmit={aoSubmeterForm}>
                <TextField
                    variant="standard"
                    label='Nome'
                    fullWidth
                    required
                    value={nomeRestaurante}
                    onChange={evento => setNomeRestaurante(evento.target.value)} />
                <Button sx={{ marginTop: 5 }} variant="outlined" type="submit" fullWidth>Salvar</Button>
            </Box>
        </Box>

    )
}