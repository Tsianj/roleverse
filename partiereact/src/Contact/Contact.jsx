import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    sujet: "Choisir un option",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envoyez les données au backend
      await axios.post("http://localhost:3000/mail", formData);
      console.log("Email envoyé avec succès!");
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email :", error);
    }
  };

  return (
    <div className="contact">
      <div className="titre_contact">
        <p className="titre_c">Nous Contacter</p>
        <br />
        <p className="texte_contact">
          Une question? Un problème rencontré ? Ou même une suggestion? N’hésite
          pas a nous envoyer un message.
        </p>
      </div>
      <form
        action="#"
        method="post"
        className="formulaire"
        onSubmit={handleSubmit}
      >
        <label for="nom">Nom : </label>
        <input
          type="text"
          name="nom"
          id="nom"
          value={formData.nom}
          onChange={handleChange}
          required
        />
        <br />
        <label for="email">Email : </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <label for="sujet">Sujet : </label>
        <select
          name="sujet"
          id="sujet"
          value={formData.sujet}
          onChange={handleChange}
          required
        >
          <option value="Choisir un option" selected disabled>
            Choisir un option :
          </option>
          <option value="Demande de renseignements">
            Demande de renseignements
          </option>
          <option value="Rapport de bug">Rapport de bug</option>
          <option value="Suggestion">Suggestion</option>
        </select>
        <br />
        <label htmlFor="message">Message : </label>
        <br />
        <textarea
          name="message"
          id="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <br />
        <button type="submit" className="btn_contact">
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default Contact;
