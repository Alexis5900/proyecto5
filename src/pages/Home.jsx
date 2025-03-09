import { useState } from "react";
import useFetch from "../hooks/useFetch";
import PokemonCard from "../components/PokemonCard";
import Navbar from "../components/Navbar";
import { Grid, TextField, Container } from "@mui/material";

export default function Home() {
  const { data, loading, error } = useFetch("pokemon?limit=20");
  const [search, setSearch] = useState("");

  if (loading) return <p className="text-center">Cargando Pokémon...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  const pokemonList = data?.results || [];

  return (
    <div>
      <Navbar />
      <Container>
        <TextField
          label="Buscar Pokémon"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        <Grid container spacing={2}>
          {pokemonList
            .filter((p) => p.name.includes(search))
            .map((p) => (
              <Grid item xs={12} sm={6} md={4} key={p.name}>
                <PokemonCard name={p.name} image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.url.split("/")[6]}.png`} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
}
