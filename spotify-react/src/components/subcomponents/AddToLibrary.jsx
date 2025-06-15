import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "../../GlobalContext";

export default function AddToLibrary({ data }) {
  const { signalLibraryReload } = useGlobalContext();
  const [isSelected, setIsSelected] = useState(false);

  async function checkIfFavorited() {
    try {
      const response = await axios.get("http://localhost:3000/library");
      const libraryItems = response.data;
      const found = libraryItems.some((item) => item.id === data?.id);
      setIsSelected(found);
    } catch (error) {
      console.error("Erro ao verificar biblioteca:", error);
    }
  }

  useEffect(() => {
    checkIfFavorited();
  }, [signalLibraryReload, data?.id]);

  async function addItem() {
    try {
      await axios.post("http://localhost:3000/library", data);
      signalLibraryReload();
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
    }
  }

  return (
    <div
      className={`add-item-to-library ${
        isSelected ? "add-item-to-libary-selected" : ""
      }`}
      onClick={addItem}
      role="button"
      tabIndex="0"
      title={isSelected ? "Remover da biblioteca" : "Adicionar à biblioteca"}
    >
      <FontAwesomeIcon icon={faHeart} size="xl" />
    </div>
  );
}
