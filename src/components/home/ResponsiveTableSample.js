// npm install react-super-responsive-table
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const pm10Color = (val) => {
  let color = "#329fff";

  if (val > 30 && val <= 80) {
    color = "#00c73c";
  } else if (val > 80 && val <= 150) {
    color = "#fd9b5a";
  } else if (val > 150) {
    color = "#ff5959";
  }

  return color;
};

const pm25Color = (val) => {
  let color = "#329fff";

  if (val > 15 && val <= 35) {
    color = "#00c73c";
  } else if (val > 35 && val <= 75) {
    color = "#fd9b5a";
  } else if (val > 75) {
    color = "#ff5959";
  }

  return color;
};

const ResponsiveTable = ({ data }) => {
  console.log("--table data--");
  console.log(data);

  return (
    // <Table >
    <Table style={{ borderCollapse: "collapse" }}>
      <Thead>
        <Tr>
          {data.length > 0 &&
            Object.keys(data[0]).map((key) => (
              <Th
                style={{
                  borderBottom: "1px solid rgba(224, 224, 224)",
                  lineHeight: "2rem",
                  fontWeight: "bold",
                }}
                key={`th-${key}`}
              >
                {key}
              </Th>
            ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item) => (
          <Tr
            key={`tr-${item.시간}-${item.구분}`}
            style={{
              border: "0px",
              borderBottom: "1px solid rgba(224, 224, 224)",
            }}
          >
            {Object.keys(item).map((key) => (
              <Td
                style={{
                  borderBottom: "1px solid rgba(224, 224, 224)",
                  lineHeight: "2rem",
                }}
                key={`td-${key}`}
              >
                {["시간", "구분"].indexOf(key) > -1 ? (
                  <span
                    style={{
                      color: item.구분 === "PM10" ? "#8884d8" : "#82ca9d",
                    }}
                  >
                    {item[key]}
                  </span>
                ) : (
                  <span
                    style={{
                      color:
                        item.구분 === "PM10"
                          ? pm10Color(item[key])
                          : pm25Color(item[key]),
                    }}
                  >
                    {item[key]}
                  </span>
                )}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default ResponsiveTable;
