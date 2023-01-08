type TVesselPopup = {
  properties: {
    name: string;
    IMO: number;
    sailingFrom: string;
    sailingTo: string;
  };
};

const VesselPopup = (props: TVesselPopup) => {
  const { properties } = props;

  return (
    <>
      <div>
        <p>
          Name: <span>{properties.name}</span>
        </p>
      </div>
      <div>
        <p>
          IMO: <span>{properties.IMO}</span>
        </p>
      </div>
      <div>
        <p>
          Sailing From: <span>{properties.sailingFrom}</span>
        </p>
      </div>
      <div>
        <p>
          Sailing To: <span>{properties.sailingTo}</span>
        </p>
      </div>
    </>
  );
};

export default VesselPopup;
