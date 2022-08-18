import { AppBar, Box, Button, Typography, Container, Link, Toolbar, Paper } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

export default function MenuAdmin() {
    return (
        <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Box sx={{display: 'flex', flexGrow: 1}}>
                            <Link component={RouterLink} to='/admin/restaurantes'>
                                <Button sx={{my: 2, color:'white'}}>Restaurantes</Button>
                            </Link>
                            <Link component={RouterLink} to='/admin/restaurantes/novo'>
                                <Button sx={{my: 2, color:'white'}}>Novo Restaurante</Button>
                            </Link>
                            <Link component={RouterLink} to='/admin/pratos'>
                                <Button sx={{my: 2, color:'white'}}>Pratos</Button>
                            </Link>
                            <Link component={RouterLink} to='/admin/pratos/novo'>
                                <Button sx={{my: 2, color:'white'}}>Novo Prato</Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
    )
}