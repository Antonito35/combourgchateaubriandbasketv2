"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from 'lucide-react'
import Image from "next/image"

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Photos d'équipes", href: "/equipes" },
  { name: "Organigramme", href: "/organigramme" },
  { name: "Planning des entrainements", href: "/planing" },
  { name: "Événements", href: "/evenements" },
  { name: "Contact", href: "/contact" },
  { name: "Boutique", href: "/boutique" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="relative py-4" style={{ background: "transparent" }}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Logo du club"
            width={150}
            height={65}
            style={{ height: "auto" }}
            className="mx-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation visible au-delà de 760px */}
        <nav className="hidden md:flex space-x-6">
          <ul className="flex space-x-6">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-white hover:text-black px-2 py-1 rounded text-base"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bouton menu mobile visible en dessous de 760px */}
        <div className="md:hidden absolute right-4 top-1/2 transform -translate-y-1/2">
          <button type="button" className="text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Menu mobile actif seulement sous 760px */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end md:hidden bg-black bg-opacity-60">
          <div className="w-72 h-full p-6 shadow-lg bg-custom-blue">
            <div className="flex justify-between items-center mb-8">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                <Image
                  src="/images/logo.png"
                  alt="Logo du club"
                  width={100}
                  height={45}
                  style={{ height: "auto" }}
                  priority
                />
              </Link>
              <button onClick={() => setIsMenuOpen(false)} className="p-1">
                <X className="h-7 w-7 text-white" />
              </button>
            </div>
            <ul className="space-y-5">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block text-white hover:text-gray-300 font-medium text-lg py-2 px-3 rounded hover:bg-gray-700 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}
