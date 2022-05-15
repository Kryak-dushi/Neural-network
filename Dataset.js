function csvToArray(str) {
    const delimiter = ",";
    const headers = str.slice(0, str.indexOf("\r\n")).split(delimiter);
    const rows = str.slice(str.indexOf("\r\n") + 1).split("\r\n");

    const data = rows.map(function (row) {
        if (row != "") {
            let values = row.split(delimiter);

            switch (values[0]) {
                case "\nFemale":
                case "Female": {
                    values[0] = 0;
                    break;
                }
                case "\nMale":
                case "Male": {
                    values[0] = 1;
                    break;
                }
            }
            values[1] = Number.parseInt(values[1]);
            values[2] = Number.parseInt(values[2]);
            values[3] = Number.parseInt(values[3]);
            if (values[4] == "Yes") { values[4] = 1 } else values[4] = 0;
            switch (values[5]) {
                case "children": {
                    values[5] = 0;
                    break;
                }
                case "Govt_job": {
                    values[5] = 1;
                    break;
                }
                case "Never_worked": {
                    values[5] = 2;
                    break;
                }
                case "Private": {
                    values[5] = 3;
                    break;
                }
                case "Self-employed": {
                    values[5] = 4;
                    break;
                }
            }
            if (values[6] == "Rural") { values[6] = 1 } else values[6] = 0;
            values[7] = Number.parseFloat(values[7]);
            values[8] = (values[8] != "N/A") ? Number.parseFloat(values[8]) : 25;
            switch (values[9]) {
                case "never smoked": {
                    values[9] = 0;
                    break;
                }
                case "formerly smoked": {
                    values[9] = 1;
                    break;
                }
                case "smokes": {
                    values[9] = 2;
                    break;
                }
                case "Unknown": {
                    values[9] = 3;
                    break;
                }
            }
            values[10] = Number.parseInt(values[10]);
            return values;
        }
    });

    return data;
}