
import { AppBar, Box, Button, Typography, Container, Link, Toolbar, Paper } from "@mui/material"
import { Link as RouterLink, Outlet } from "react-router-dom"
import MenuAdmin from "./components/MenuAdmin/MenuAdmin"

export default function BaseAdmin() {

    return (
        <>
            <MenuAdmin/>

            <Box>
                <Container maxWidth='lg' sx={{mt:1}}>
                    <Paper sx={{p:2}}>
                        <Outlet/>
                    </Paper>
                </Container>
            </Box>

            
        </>
    )
}