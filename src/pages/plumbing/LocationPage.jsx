import React, { useState, useEffect } from "react";
import DataTree from "../../components/data-tree/DataTree";
import { useLocation } from "react-router-dom";
import MainContainer from "../../components/containers/main-container/MainContainer";
import PageHeader from "../../components/page-header/PageHeader";
import LocationContainer from "../../components/containers/location-container/LocationContainer";
import LocationActions from "../../components/location-actions/LocationActions";
import axios from "axios";

const animationStyle = {
  "@keyframes slideUp": {
    "0%": {
      opacity: 0,
      transform: "translateY(-20%)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  "@keyframes slideDown": {
    "0%": {
      opacity: 1,
      transform: "translateY(0%)",
    },
    "100%": {
      opacity: 0,
      transform: "translateY(0%)",
    },
  },
};
const LocationPage = () => {
  const [location, setLocation] = useState("");
  const [editedLocation, setEditedLocation] = useState("");
  const [currentNodeKey, setCurrentNodeKey] = useState(null);
  const [treeData, setTreeData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);
  const [parent, setParent] = useState("");

  const { pathname } = useLocation();

  useEffect(() => {
    fetchData();
  }, [treeData]);
  //---------API GET--------------------------
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/locations");
      setTreeData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //----------------API POST -------------------
  const addNewLocation = async (newLocation, parentId) => {
    console.log(newLocation, parentId, "parrent  id");
    // UUID oluşturma
    const id = Math.floor(Math.random() * 1000000) + 1;

    // JSON objesini oluşturma
    const locationObject = {
      id: id.toString(),
      key: id.toString(),
      title: newLocation,
    };

    try {
      // ParentId kontrolü yaparak çocuk eklemeyi sağlayabiliriz
      if (parentId) {
        const response = await axios.get(
          `http://localhost:3000/locations/${parentId}`
        );
        const parentLocation = response.data;
        // Eğer parentLocation children propertysine sahip değilse, onu oluştur
        if (!parentLocation.children) {
          parentLocation.children = [];
        }
        // Yeni lokasyonu ebeveyn lokasyonun children listesine ekle
        parentLocation.children.push(locationObject);
        // Güncellenmiş ebeveyn lokasyonu API'ye gönder
        await axios.put(
          `http://localhost:3000/locations/${parentId}`,
          parentLocation
        );
        // Set treeData gibi durumları güncelle
        setTreeData(treeData);
        setEditedLocation("");
      } else {
        // Eğer parentId yoksa, direkt olarak yeni lokasyonu API'ye gönder
        const response = await axios.post(
          "http://localhost:3000/locations",
          locationObject
        );
        setTreeData([...treeData, response.data]);
      }
      // Yeni lokasyon oluşturulduktan sonra editedLocation'ı sıfırla
      setEditedLocation("");
      setIsEditMode(false);
    } catch (error) {
      console.error("Error adding new location:", error);
    }
  };
  //---------------API PUT ------------------
  const updateLocationTitle = async (location, newTitle) => {
    try {
      const updatedLocation = {
        id: location.id,
        title: newTitle,
        key: location.key,
        children: location.children,
      };
      await axios.put(
        `http://localhost:3000/locations/${location.id}`,
        updatedLocation
      );
      const updatedTreeData = treeData.map((location) => {
        if (location.id === location.id) {
          return { ...location, title: newTitle };
        }
        return location;
      });
      setTreeData(updatedTreeData);
    } catch (error) {
      console.error("Error updating location title:", error);
    }
    setEditedLocation("");
    setIsEditMode(false);
  };
  //---------- API DELETE -------------------------
  const deleteLocation = async (id) => {
    console.log(id, "deleteId");

    try {
      await axios.delete(`http://localhost:3000/locations/${id}`);
      const updatedTreeData = deleteLocationFromTree(treeData, id);
      setTreeData(updatedTreeData);
    } catch (error) {
      console.error("Error deleting location:", error);
    }
    setEditedLocation("");
    setLocation("");
    setIsEditMode(false);
  };

  const deleteLocationFromTree = (data, id) => {
    return data
      .filter((location) => location.id !== id)
      .map((location) => {
        if (location.children) {
          return {
            ...location,
            children: deleteLocationFromTree(location.children, id),
          };
        }
        return location;
      });
  };

  const handleLocation = (node) => {
    console.log(node, "node");
    // Seçilen düğümün parent'ını bulma
    // const parent = findParentNode(treeData, id);
    if (node?.title === location.title && node?.id === location.id) {
      setLocation("");
      setCurrentNodeKey(null);
      setEditedLocation("");
      setInputVisible(false);
    } else {
      setLocation(node);
      setEditedLocation("");
      setCurrentNodeKey(node?.key);
    }
  };
  const toggleEditVisibility = () => {
    setIsEditMode(!isEditMode);
    setInputVisible(!inputVisible);
  };
  const toggleInputVisibility = () => {
    setInputVisible(!inputVisible);
  };
  const handleInputChange = (event) => {
    setEditedLocation(event.target.value);
  };

  return (
    <>
      <PageHeader currentUrl={pathname} />
      <LocationContainer>
        <DataTree handleLocation={handleLocation} treeData={treeData} />
        <LocationActions
          location={location}
          toggleEditVisibility={toggleEditVisibility}
          toggleInputVisibility={toggleInputVisibility}
          deleteLocation={deleteLocation}
          inputVisible={inputVisible}
          editedLocation={editedLocation}
          handleInputChange={handleInputChange}
          updateLocationTitle={updateLocationTitle}
          isEditMode={isEditMode}
          addNewLocation={addNewLocation}
          currentNodeKey={currentNodeKey}
          setIsEditMode={setIsEditMode}
        />
      </LocationContainer>
    </>
  );
};

export default LocationPage;
