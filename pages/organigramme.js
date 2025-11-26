import Layout from "../components/Layout"
import Image from "next/image"

const members = [
  { name: "ERIC FEVRIER", role: "Président", image: "/images/ERIC FEVRIER.jpg" },
  { name: "THEO TREMORIN.", role: "Vice Président et Responsable sponsors", image: "/images/THEO TREMORIN.jpg" },
  { name: "CELINE MORIN", role: "Trésorerie", image: "/images/CELINE MORIN.jpg" },
  { name: "CHRISTOPHER", role: "Entraineur professionnel", image: "/images/CHRISTOPHER.jpg" },
  { name: "TANGUY RICHARD", role: "Responsable technique", image: "/images/TANGUY RICHARD.jpg" },
  { name: "CAROLE-ANN LOUVET", role: "Secrétariat", image: "/images/CAROLE-ANN LOUVET.jpg" },
  { name: "MORGANE GAUTIER", role: "Secrétariat et Planning", image: "/images/MORGANE GAUTIER.jpg" },
  { name: "AUDREY CITRE", role: "Planning et Communication", image: "/images/AUDREY CITRE.jpg" },
  { name: "ANTOINE SIMON", role: "Communication et Responsable site web", image: "/images/ANTOINE SIMON.jpg" },
  { name: "ELISE VINOUSE", role: "Communication, Restauration et Buvette", image: "/images/ELISE VINOUSE.jpg" },
  { name: "TYMEO LEPRIZE", role: "Restauration, Buvette et Boutique", image: "/images/TYMEO LEPRIZE.jpg" },
  { name: "AXEL MORIN MARIE", role: "Restauration, Buvette et Evenement", image: "/images/AXEL MORIN MARIE.jpg" },
  { name: "JULIEN PICHON", role: "Evenement", image: "/images/JULIEN PICHON.jpg" },
]

export default function Organigramme() {
  return (
    <Layout title="Organigramme - Club de Basket Combourg">
      <h1 className="text-4xl font-bold mb-6">Organigramme</h1>
      <div className="organigramme-grid">
        {members.map((member, index) => (
          <div key={index} className="membre" data-aos="flip-right" data-aos-offset="125">
            <div className="w-48 h-48 relative mb-4 mx-auto overflow-hidden rounded-full">
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                fill
                sizes="192px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <h2 className="text-xl font-semibold">{member.name}</h2>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}