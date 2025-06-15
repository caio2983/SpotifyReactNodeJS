import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "../../GlobalContext";
export default function AddToLibrary({ data }) {
  const { signalLibraryReload } = useGlobalContext();

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
      className="add-item-to-library"
      onClick={addItem}
      role="button"
      tabIndex="0"
      title="Adicionar à biblioteca"
    >
      <FontAwesomeIcon icon={faHeart} size="xl" />
    </div>
  );
}
