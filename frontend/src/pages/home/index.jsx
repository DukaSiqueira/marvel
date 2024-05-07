import AuthLayout from "../../template/authLayout";
import Card from "../../components/card";
import { marvel } from "../../services/api";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
    const [heroes, setHeroes] = useState([]);
  const getFavoriteHeroes = async () => {
    const myHeroes = window.localStorage.getItem("heroes");
    const userId = window.sessionStorage.getItem("user_id");
    let myHeroesIds = [];
    const allHeroes = [];
    if (myHeroes) {
      myHeroesIds = JSON.parse(myHeroes)[userId];
      for (const heroId of myHeroesIds) {
        const res = await marvel.get(`/characters/${heroId}`);
        allHeroes.push({
          id: res.data.data.results[0].id,
          title: res.data.data.results[0].name,
          description: res.data.data.results[0].description,
          image: `${res.data.data.results[0].thumbnail.path}.${res.data.data.results[0].thumbnail.extension}`,
        });
      }
    }
    setHeroes(allHeroes);
  };

  useEffect(() => {
    getFavoriteHeroes();
  }, []);

  return (
    <AuthLayout>
      <h1 className="font-bold text-3xl"> Meus Heróis</h1>
      <div className="flex flex-row flex-wrap justify-around mt-8 gap-y-2 items-start">
        {heroes.map((hero) => (
          <Card
            key={hero.title}
            title={hero.title}
            description={hero.description}
            image={hero.image}
          />
        ))}
      </div>
    </AuthLayout>
  );
};

export default Home;
