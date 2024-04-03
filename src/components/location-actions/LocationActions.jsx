import React from "react";
import styles from "./LocationActions.module.css";
import ButtonInput from "../../components/UI/button/ButtonInput";
import InputSearch from "../../components/UI/input/InputSearch";
const LocationActions = ({
  location,
  toggleEditVisibility,
  toggleInputVisibility,
  deleteLocation,
  inputVisible,
  editedLocation,
  handleInputChange,
  updateLocationTitle,
  isEditMode,
  addNewLocation,
  setIsEditMode,
}) => {
  return (
    <article className={styles.container}>
      <h4>Lokasyon Islemleri</h4>
      <div style={{ fontSize: "1.2em" }}>
        Lokasyon Adi:{" "}
        <span style={{ fontSize: "1.3em" }}>
          {location.title
            ? location.title
            : "Seçili bir lokasyon bulunmamaktadır."}
        </span>
      </div>
      <div className={styles.detailsButtons}>
        {location && (
          <ButtonInput
            onClick={() => {
              toggleEditVisibility();
              isEditMode(true);
            }}
          >
            Duzenle
          </ButtonInput>
        )}

        <ButtonInput
          className={location ? "" : styles.newTree}
          onClick={() => {
            toggleInputVisibility();
            isEditMode(false);
          }}
        >
          Yeni
        </ButtonInput>

        {location && (
          <ButtonInput onClick={() => deleteLocation(location.id)}>
            Sil
          </ButtonInput>
        )}
      </div>
      <div
        className={`${styles.inputDiv} ${inputVisible ? styles.visible : ""}`}
        style={{
          animation: `${
            inputVisible ? styles.slideUp : styles.slideDown
          } 1s forwards`,
        }}
      >
        <span>Guncellestirme</span>
        <InputSearch
          type="text"
          value={editedLocation}
          onChange={handleInputChange}
        />
        <div className={styles.buttons}>
          <ButtonInput
            onClick={() => {
              toggleInputVisibility();
            }}
          >
            Iptal
          </ButtonInput>
          {isEditMode ? (
            <ButtonInput
              onClick={() => {
                updateLocationTitle(location, editedLocation);
                toggleInputVisibility();
              }}
            >
              Guncelle
            </ButtonInput>
          ) : (
            <ButtonInput
              onClick={() => {
                addNewLocation(editedLocation, location.id);
                toggleInputVisibility();
              }}
            >
              Olustur
            </ButtonInput>
          )}
        </div>
      </div>
    </article>
  );
};

export default LocationActions;
