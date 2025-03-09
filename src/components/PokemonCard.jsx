import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function PokemonCard({ name, image }) {
  return (
    <Card sx={{ m: 2 }}>
      <CardMedia component="img" image={image} alt={name} height="140" />
      <CardContent>
        <Typography variant="h6" component={Link} to={`/pokemon/${name}`} style={{ textDecoration: 'none', display: 'block' }}>
          {name.toUpperCase()}
        </Typography>
      </CardContent>
    </Card>
  );
}
