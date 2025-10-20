import { MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">Riad Saveurs</h3>
            <p className="text-primary-foreground/80">Découvrez l'authenticité des saveurs marocaines depuis 2015.</p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <div className="space-y-3 text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@riadsaveurs.fr</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-bold mb-4">Horaires</h3>
            <div className="space-y-2 text-primary-foreground/80 text-sm">
              <p>Lun-Jeu: 11h30 - 23h</p>
              <p>Ven-Sam: 11h30 - 00h</p>
              <p>Dimanche: 12h - 23h</p>
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-lg font-bold mb-4">Localisation</h3>
            <div className="flex items-start gap-2 text-primary-foreground/80">
              <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
              <span>
                123 Rue de la Médina
                <br />
                75001 Paris, France
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/70">
          <p>&copy; 2025 Riad Saveurs. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
