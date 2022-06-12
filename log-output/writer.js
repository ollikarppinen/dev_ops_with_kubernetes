const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const writeUuid = () => {
  const uuid = uuidv4();
  fs.writeFile("/app/shared/uuid.txt", uuid, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

setInterval(writeUuid, 5000);
