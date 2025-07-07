import React from "react";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const ContactSection = () => {
  const contactInfo = [
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: "Email",
      content: "contact@fanaf.org",
      link: "mailto:contact@fanaf.org"
    },
    {
      icon: <FaPhone className="text-2xl" />,
      title: "Téléphone",
      content: "+225 27 22 49 96 00",
      link: "tel:+2252722499600"
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: "Adresse",
      content: "Abidjan, Côte d'Ivoire",
      link: "#"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <div className="text-center mb-12 md:mb-16">
          <h2 className={cn(integralCF.className, "text-3xl md:text-4xl lg:text-5xl mb-6")}>
            Contactez-nous
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Une question ? Un renseignement ? N'hésitez pas à nous contacter
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Envoyez-nous un message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    Prénom
                  </label>
                  <Input id="firstName" type="text" placeholder="Votre prénom" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    Nom
                  </label>
                  <Input id="lastName" type="text" placeholder="Votre nom" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input id="email" type="email" placeholder="votre@email.com" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Sujet
                </label>
                <Input id="subject" type="text" placeholder="Sujet de votre message" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Votre message..." 
                  rows={5}
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Envoyer le message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Informations de contact</h3>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{info.title}</h4>
                    <a 
                      href={info.link} 
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {info.content}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-white rounded-lg shadow-sm">
              <h4 className="font-semibold text-lg mb-4">Horaires d'ouverture</h4>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Lundi - Vendredi</span>
                  <span>8h00 - 18h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span>9h00 - 13h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche</span>
                  <span>Fermé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 