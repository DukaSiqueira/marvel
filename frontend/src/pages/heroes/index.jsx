import AuthLayout from "../../template/authLayout";
import Card from "../../components/card";
import { useState } from "react";
import { marvel } from "../../services/api";
import { useEffect } from "react";
import { Button, Pagination, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Heroes = () => {
  const [heroes, setHeroes] = useState([]);
  const [load, setLoad] = useState(true);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const getHeroes = async (page) => {
    setPage(page);
    setLoad(true);

    const res = await marvel
      .get("/characters", {
        params: {
          limit: 20,
          offset: page ? (page - 1) * 20 : 0,
          nameStartsWith: search ? search : undefined,
        },
      })
      .then((response) => {
        const qtd = response.data.data.total / 20;

        setCount(qtd % 1 === 0 ? qtd : parseInt(qtd) + 1);
        console.log(response.data.data.results);
        const myHeroes = window.localStorage.getItem('heroes');
        const userId = window.sessionStorage.getItem('user_id');
        let myHeroesIds = [];
        if(myHeroes) {
            myHeroesIds = JSON.parse(myHeroes)[userId];
        }
        return response.data.data.results.map((hero) => {
          return {
            id: hero.id,
            title: hero.name,
            description: hero.description,
            image: `${hero.thumbnail.path}.${hero.thumbnail.extension}`,
            like: myHeroesIds ? myHeroesIds.includes(hero.id) : false,
          };
        });
      });
    setHeroes(res);
    setLoad(false);
    console.log(res);
  };

  useEffect(() => {
    getHeroes();
  }, []);

  const toggleLike = (index) => {
    const hr = [...heroes];
    hr[index].like = !hr[index].like;
    if(hr[index].like) {
        let myHeroes = window.localStorage.getItem('heroes');
        const userId = window.sessionStorage.getItem('user_id');
        if(myHeroes) {
            myHeroes = JSON.parse(myHeroes);
            if(myHeroes[userId]){
                myHeroes[userId].push(hr[index].id);
            } else {
                myHeroes[userId] = [hr[index].id];
            }
            window.localStorage.setItem('heroes', JSON.stringify(myHeroes));
        } else {
            window.localStorage.setItem('heroes', JSON.stringify({[userId]: [hr[index].id]}));
        }
    }else {
        let myHeroes = window.localStorage.getItem('heroes');
        const userId = window.localStorage.getItem('user_id');
        if(myHeroes) {
            myHeroes = JSON.parse(myHeroes);
            if(myHeroes[userId]){
                myHeroes[userId] = myHeroes[userId].filter((id) => id !== hr[index].id);
                window.localStorage.setItem('heroes', JSON.stringify(myHeroes));
            }
        }
    }
    setHeroes(hr);
  };
  return (
    <AuthLayout>
      <div className="flex flex-row justify-between px-5">
        <h1 className="font-bold text-3xl">Heróis</h1>
        <div className="flex flex-row w-1/4 gap-x-2">
          <TextField
            label="Buscar herói"
            variant="outlined"
            color="primary"
            className="w-4/5"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <Button variant="contained" className="w-1/5" onClick={getHeroes}>
            <SearchIcon color="#fff" />
          </Button>
        </div>
      </div>
      {load ? (
        <p className="text-3xl font-bold text-slate-500 mx-auto mt-10 text-center">
          Carregando...
        </p>
      ) : (
        <>
          <div className="flex flex-row flex-wrap justify-around mt-8 gap-4">
            {heroes.map((hero) => (
              <Card
                key={hero.title}
                title={hero.title}
                description={hero.description}
                image={hero.image}
                hasActions
                isLiked={hero.like}
                toggleLike={() => toggleLike(heroes.indexOf(hero))}
              />
            ))}
          </div>
          <div className="flex flex-row justify-center">
            <Pagination
              count={count}
              color="primary"
              onChange={(e, page) => getHeroes(page)}
              page={page}
              className="mt-4 mx-auto"
            />
          </div>
        </>
      )}
    </AuthLayout>
  );
};

export default Heroes;
