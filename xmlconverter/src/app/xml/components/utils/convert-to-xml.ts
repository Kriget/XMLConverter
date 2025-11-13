import { Address, Family, Person, Telephone, XmlParseError } from "../../types";
import { create } from "xmlbuilder2";

//helpers
function getCharBeforePipe(row: string) {
  const idx = row.indexOf("|");
  if (idx <= 0) return null;

  return row[idx - 1];
}

export default function convertToXml(data: string): string | XmlParseError {
  try {
    const stringifiedData = JSON.stringify(data.trim()).replace(/"/g, "");

    // console.log("STRINGIFIED DATA: ", stringifiedData);

    const rows = stringifiedData.split("\\n");

    // console.log("ROWS: ", rows);

    const people: Person[] = [];

    let person = {} as Person;
    // let newPerson = false;

    rows.forEach((row, index) => {
      const entityData = row.split("|");
      switch (getCharBeforePipe(row)) {
        case "P":
          // is a new person

          // check if the person object is not empty, due to the string can contain multiple people
          if (Object.keys(person).length !== 0) {
            // push up previous person, clearing the person object
            people.push(person);
            person = {} as Person;
          }

          // first name
          if (!!entityData[1]) {
            person.firstname = entityData[1];
          }

          // last name
          if (!!entityData[2]) {
            person.lastname = entityData[2];
          }

          break;
        case "F":
          let phone: Telephone | null = null;
          let address: Address | null = null;
          // check if the family member has an address or telephone
          try {
            if (getCharBeforePipe(rows[index + 1]) === "A") {
              // is a new address or telephone
              const addressData = rows[index + 1].split("|");
              address = {
                street: addressData[1],
                city: addressData[2],
                zip: addressData[3],
              } as Address;
            }
            if (getCharBeforePipe(rows[index + 1]) === "T") {
              // is a new telephone
              const phoneData = rows[index + 1].split("|");
              phone = {
                mobile: phoneData[1],
                landline: phoneData[2],
              } as Telephone;
            }
          } catch (e) {
            // ignore this, family members may not have an address or telephone
          }

          // is a new family
          if (!!entityData[1]) {
            person.family = [
              ...(person.family || []),
              {
                name: entityData[1],
                birthyear: parseInt(entityData[2]),
                telephone: phone,
                address: address,
              } as Family,
            ];
          }

          break;
        case "T":
          // is a new telephone, and the person itself does not have a telephone yet
          // due to family members having telephones, we need to check if the person itself does not have a telephone yet
          if (!!entityData[1] && !person.telephone) {
            person.telephone = {
              mobile: entityData[1],
              landline: entityData[2],
            } as Telephone;
          }
          break;
        case "A":
          // is a new address, and the person itself does not have an address yet
          // due to family members having addresses, we need to check if the person itself does not have an address yet
          if (!!entityData[1] && !person.address) {
            person.address = {
              street: entityData[1],
              city: entityData[2],
              zip: entityData[3],
            } as Address;
          }
          break;
        default:
          throw new Error("Invalid entity type");
      }
    });

    // push up the last person, clearing the person object
    people.push(person);
    person = {} as Person;

    // console.log("PEOPLE: ", people);

    // Build up the XML document
    const doc = create().ele("people");
    people.forEach((person) => {
      doc.ele("person").ele(person);
    });
    const xml = doc.end({ prettyPrint: true });

    // console.log("XML: ", xml);

    return xml;
  } catch (e) {
    console.error(e);
    const error = {
      message: (e as Error).message,
      code: 500,
    } as XmlParseError;

    return error;
  }
}
