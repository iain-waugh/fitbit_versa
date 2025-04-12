function mySettings(props) {
  return (
    <Page>
         <Select
            label="Decal Colour"
            settingsKey="decal"
            options={[
               {
                 name: "Red",
                 value: {
                   background: "#000000",
                   foreground: "#cc3345"
                 }
               },
               {
                 name: "Green",
                 value: {
                   background: "#000000",
                   foreground: "#33cc33"
                 }
               },
               {
                 name: "Blue",
                 value: {
                   background: "#000000",
                   foreground: "#3380cc"
                 }
               },
               {
                 name: "Yellow",
                 value: {
                   background: "#000000",
                   foreground: "#c5cc33"
                 }
               },
               {
                 name: "Orange",
                 value: {
                   background: "#000000",
                   foreground: "#cc8833"
                 }
               },
               {
                 name: "White",
                 value: {
                   background: "#000000",
                   foreground: "#c5ccc3"
                 }
               }]
            }
          />
    </Page>
  );
}

registerSettingsPage(mySettings);
