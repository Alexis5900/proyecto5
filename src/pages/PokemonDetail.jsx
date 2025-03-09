import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Navbar from "../components/Navbar";
import { Card, CardContent, CardMedia, Typography, Container, Button, CircularProgress } from "@mui/material";

export default function PokemonDetail() {
  const { name } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`pokemon/${name}`);

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>Cargando detalles...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6" color="error">Error al cargar los datos</Typography>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Volver
        </Button>
      </Container>
    );
  }

  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  return (
    <div>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Card sx={{ mt: 4, padding: 2 }}>
          <CardMedia
            component="img"
            image={data.sprites?.other?.["official-artwork"]?.front_default || "https://via.placeholder.com/200"}
            alt={name}
            height="200"
          />
          <CardContent>
            <Typography variant="h4">{name.toUpperCase()}</Typography>
            <Typography variant="body1">Peso: {data.weight / 10} kg</Typography>
            <Typography variant="body1">Altura: {data.height / 10} m</Typography>
          </CardContent>
        </Card>
        <Button variant="contained" color="primary" onClick={() => navigate(-1)} sx={{ mt: 3 }}>
          Volver
        </Button>
      </Container>
    </div>
  );
}
