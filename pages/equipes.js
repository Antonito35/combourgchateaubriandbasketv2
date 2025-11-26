import Layout from "../components/Layout"
import Image from "next/image"
import ImageZoom from "@/components/ImageZoom";

const teams = [
  { name: "SM1", image: "/images/SM1.jpg" },
  { name: "SM2", image: "/images/SM2.JPG" },
  { name: "SM3", image: "/images/image.png" },
  { name: "SM4", image: "/images/SM4.jpg" },
  { name: "U18 M1", image: "/images/U18M1.jpeg" },
  { name: "U18 M2", image: "/images/image.png" },
  { name: "U18 M3", image: "/images/U18M3.jpg" },
  { name: "U15 M1", image: "/images/U15M1.JPG" },
  { name: "U15 M2", image: "/images/image.png" },
  { name: "U13 M1", image: "/images/U13M1.jpg" },
  { name: "U13 M2", image: "/images/U13M2.jpg" },
  { name: "U11 M1", image: "/images/image.png" },
  { name: "U11 M2", image: "/images/U11M2.jpg" },

]

const mixedTeams = [
  { name: "U9 Mixte", image: "/images/U9.jpg" },
  { name: "U7 Mixte", image: "/images/U7.jpg" },
];

const femaleTeams = [
  { name: "SF1", image: "/images/SF1.JPG" },
  { name: "SF2", image: "/images/SF2.jpg" },
  { name: "U18 F1", image: "/images/U18F1.JPG" },
  { name: "U18 F2", image: "/images/U18F2.jpg" },
  { name: "U15 F1", image: "/images/U15F.jpg" },
  { name: "U13 F1", image: "/images/image.png" },
  { name: "U11 F1", image: "/images/image.png" },
]

export default function Equipes() {
  return (
    <Layout title="Équipes - Club de Basket Combourg">
      <h1 className="text-4xl font-bold mb-6">Photos d'équipes</h1>

      <h2 className="text-3xl font-semibold mb-4">Équipes Masculines</h2>
      <div className="equipes-grid">
        {teams.map((team, index) => (
          <div key={index} className="equipe" data-aos="flip-right" data-aos-offset="125">
            <h3 className="text-xl font-semibold mb-2">Équipe {team.name}</h3>
            <ImageZoom
              src={team.image}
              alt={`Équipe ${team.name}`}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-semibold mb-4 mt-8">Équipes Mixtes</h2>
      <div className="equipes-grid equipes-grid--left">
        {mixedTeams.map((team, index) => (
          <div key={index} className="equipe" data-aos="flip-right" data-aos-offset="125">
            <h3 className="text-xl font-semibold mb-2">Équipe {team.name}</h3>
            <ImageZoom
              src={team.image}
              alt={`Équipe ${team.name}`}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-semibold mb-4 mt-8">Équipes Féminines</h2>
      <div className="equipes-grid">
        {femaleTeams.map((team, index) => (
          <div key={index} className="equipe" data-aos="flip-right" data-aos-offset="125">
            <h3 className="text-xl font-semibold mb-2">Équipe {team.name}</h3>
            <ImageZoom
              src={team.image}
              alt={`Équipe ${team.name}`}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        ))} 
      </div>
    </Layout>
  )
}

