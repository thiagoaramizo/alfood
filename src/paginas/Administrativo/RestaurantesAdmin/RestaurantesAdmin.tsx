import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import http from "../../../http"
import IRestaurante from "../../../interfaces/IRestaurante"

export default function RestaurantesAdmin() {
    
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect( () => {
        http.get('restaurantes/')
        .then( (resposta) => {
            setRestaurantes( resposta.data )
        })
        .catch( error => console.log( error ))
    }, [])

    const excluir = (restauranteParaExcluir: IRestaurante) => {
        http.delete( `restaurantes/${restauranteParaExcluir.id}/` )
        .then( () => {
            const listaRestaurante = restaurantes.filter( restaurante => restaurante.id !== restauranteParaExcluir.id)
            setRestaurantes( [...listaRestaurante] )
        })
        .catch( error => console.log(error) )

    } 


    
    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Editar</TableCell>
                            <TableCell>Deletar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {restaurantes.map( restaurante => 
                            <TableRow key={restaurante.id}>
                                <TableCell>
                                    {restaurante.nome}
                                </TableCell>
                                <TableCell>
                                    [ <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link> ]
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant='outlined'
                                        color='error'
                                        onClick={ () => excluir(restaurante) }
                                    >Excluir</Button>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}