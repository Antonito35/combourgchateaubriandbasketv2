"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export default function ImageZoom({ src, alt = "Image", zoomWidth = 1920, zoomHeight = 1080, onPrev, onNext, thumbnail = false, ...rest }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src)

  // Sync currentSrc when parent changes the src prop (fix carousel arrows)
  useEffect(() => {
    setCurrentSrc(src)
  }, [src])

  // Empêche le scroll du body quand modal ouverte
  useEffect(() => {
    if (isZoomed) {
      const previous = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = previous
      }
    }
  }, [isZoomed])

  // Ferme la modale à la touche ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIsZoomed(false)
    }
    if (isZoomed) document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [isZoomed])


  const closeZoom = () => setIsZoomed(false);

  return (
    <div>
      {/* Image d'origine */}
      <div className="cursor-pointer" onClick={() => setIsZoomed(true)}>
        {thumbnail ? (
          <div className={rest.className ? rest.className : 'w-full h-full relative'}>
            <Image
              src={currentSrc}
              alt={alt}
              fill
              style={{ objectFit: 'contain' }}
              onError={() => {
                if (currentSrc !== "/images/image.png") setCurrentSrc("/images/image.png")
              }}
            />
          </div>
        ) : (
          <Image
            src={currentSrc}
            alt={alt}
            // use a modest thumbnail size to avoid pixelation when zoomed
            width={rest.width || Math.min(zoomWidth, 800)}
            height={rest.height || Math.min(zoomHeight, 600)}
            // Respect the provided className (don't force object-cover)
            className={rest.className ? rest.className : "rounded-lg shadow-lg object-contain"}
            onError={() => {
              if (currentSrc !== "/images/image.png") setCurrentSrc("/images/image.png")
            }}
            {...(rest || {})}
          />
        )}
      </div>

      {/* Si zoom activé, afficher la modale centrée via portal */}
      {isZoomed && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 px-4"
          onClick={closeZoom}
        >
          <div
            // Conteneur centré : limité en largeur/hauteur pour que le backdrop reste cliquable
            className="relative flex items-center justify-center"
            style={{ maxWidth: '900px', maxHeight: 'calc(100vh - 120px)', width: '100%' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeZoom}
              aria-label="Fermer l'image"
              className="absolute top-2 right-2 z-50 p-2 bg-black/40 hover:bg-black/60 rounded text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="flex flex-col items-center" style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', position: 'relative' }}>
                {/* Prev button inside modal */}
                {onPrev && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onPrev(); }}
                    aria-label="Précédent"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/10 text-white p-3 rounded-full"
                  >
                    {/* left chevron */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}

                    <div className="w-full flex justify-center">
                      <div style={{ maxWidth: '100%', width: '100%', textAlign: 'center' }}>
                        <Image
                          src={currentSrc}
                          alt={alt}
                          width={Math.min(zoomWidth, 900)}
                          height={Math.min(zoomHeight, 700)}
                          style={{ maxWidth: '90vw', maxHeight: '70vh', objectFit: 'contain' }}
                          onError={() => {
                            if (currentSrc !== "/images/image.png") setCurrentSrc("/images/image.png")
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>

                {/* Next button inside modal */}
                {onNext && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onNext(); }}
                    aria-label="Suivant"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/10 text-white p-3 rounded-full"
                  >
                    {/* right chevron */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>
              {alt && <p onClick={(e) => e.stopPropagation()} className="text-white mt-3 text-center">{alt}</p>}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
