import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import http from "../../../http"
import IPrato from "../../../interfaces/IPrato"
import IRestaurante from "../../../interfaces/IRestaurante"

export default function PratosAdmin() {
    
    const [pratos, setPratos] = useState<IPrato[]>([])

    useEffect( () => {
        http.get('pratos/')
        .then( (resposta) => {
            setPratos( resposta.data )
        })
        .catch( error => console.log( error ))
    }, [])

    const excluir = (pratoParaExcluir: IPrato) => {
        http.delete( `pratos/${pratoParaExcluir.id}/` )
        .then( () => {
            const listaPratos = pratos.filter( prato => prato.id !== pratoParaExcluir.id)
            setPratos( [...listaPratos] )
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
                            <TableCell>Tag</TableCell>
                            <TableCell>Editar</TableCell>
                            <TableCell>Deletar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pratos.map( prato => 
                            <TableRow key={prato.id}>
                                <TableCell>
                                    {prato.nome}
                                </TableCell>
                                <TableCell>
                                    {prato.tag}
                                </TableCell>
                                <TableCell>
                                    [ <Link to={`/admin/pratos/${prato.id}`}>Editar</Link> ]
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant='outlined'
                                        color='error'
                                        onClick={ () => excluir(prato) }
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