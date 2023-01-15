import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Image, Modal, Spin } from 'antd';


export const ProductsDet = () => {
  const { id } = useParams();
  const [list, setList] = useState([]);
  const [View, setViewModel] = useState(false)
  const [lodding, setLodding] = useState(true)
  useEffect(() => {
    getList();
  }, []);
  const getList = () => {
    setLodding(true)
    fetch(`https://api.spacexdata.com/v4/rockets/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setList(json)
        setLodding(false)
      });
  };
  const handleOpenModel = () => {
    setViewModel(true)
  }
  const handleCloseModel = () => {
    setViewModel(false)
  }
  if (lodding) {
    return <Spin />
  }

  return (
    <div>
      <h1>{list.country}</h1>
      <img className="image" src={!lodding && list?.flickr_images[0]} alt="imag" />
      <h3>{list.description}</h3>

      <Button onClick={handleOpenModel}>View More Details</Button>
      <button>
        <Link to={`/`}>Back to Home Page</Link>
      </button>
      <Modal
        title="Tasks and History"
        visible={View}
        onCancel={handleCloseModel}
        footer={null}
      >

        <div> <Image className="image" src={!lodding && list?.flickr_images[0]} alt="imag" width={400} />

          <h4>first flight taken on:{list.first_flight}</h4>
          <h4>Name of the flight is:{list.name}</h4>
          <h4>Height : {list.height.feet}</h4>
          <h4>Diameter: {list.diameter.feet}</h4>
          <h4>Mass: {list.mass.kg / 1000}</h4>
          <h4>Active: {list.active ? 'Yes' : 'No'}</h4>
          <h4>Cost/Launch : ${list.cost_per_launch / 1000000} Million</h4>

        </div>
        <p>{list.description}</p>
        <a href={list.wikipedia} className="btn btn-primary btn-block" target="_blank" rel="noreferrer">Learn More</a>
      </Modal>
    </div>
  );
};