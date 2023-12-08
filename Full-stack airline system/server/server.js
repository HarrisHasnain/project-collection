const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "AIRLINECOMPANY",
  multipleStatements: true
});

app.get("/flights/all", (req, res) => {
    db.query("SELECT * FROM FLIGHT", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("result from server:")
        //console.log(result)
        res.send(result);
      }
    });
});

app.get("/flights/specific/:id", (req, res) => {
  console.log("params passed into server:")
  console.log(req.params)
  const id = req.params.id;
  db.query("SELECT * FROM FLIGHT WHERE IDNum = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("result from server:")
      //console.log(result)
      res.send(result);
    }
  });
});

app.get("/flights/passengers/:id", (req, res) => {
  console.log("params passed into server:")
  console.log(req.params)
  const id = req.params.id;
  db.query(`SELECT DISTINCT FLIGHT_BOOKING.Passenger_email, SEAT_INFO.Seat_number, SEAT_INFO.Seat_type
    FROM FLIGHT_BOOKING
    JOIN SEAT_INFO ON FLIGHT_BOOKING.Flight_IDNum = SEAT_INFO.Flight_IDNum AND FLIGHT_BOOKING.Booked_seat = SEAT_INFO.Seat_number
    WHERE FLIGHT_BOOKING.Flight_IDNum = ? ORDER BY SEAT_INFO.Seat_number ASC;`
  , [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("result from server:")
      //console.log(result)
      res.send(result);
    }
  });
});

app.get("/user/flights/:email", (req, res) => {
  console.log("params passed into server:")
  console.log(req.params)
  const email = req.params.email;
  db.query(`SELECT 
    F.Origin, F.Destination, F.Start_date, F.End_date,
    S.Seat_number, S.Seat_type, S.Seat_price,
    FB.Flight_IDNum, FB.Ticket_insurance, FB.Passenger_Email
    FROM 
      FLIGHT_BOOKING FB
    JOIN 
      FLIGHT F ON FB.Flight_IDNum = F.IDNum
    JOIN 
      SEAT_INFO S ON FB.Flight_IDNum = S.Flight_IDNum AND FB.Booked_seat = S.Seat_number
    WHERE 
      FB.Passenger_Email = ?`
  , [email], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("result from server:")
      //console.log(result)
      res.send(result);
    }
  });
});

app.delete("/delete/user-flight", (req, res) => {
  console.log("request coming into delete user flight:")
  console.log(req.body)
  const email = req.body.email;
  const flight_id = req.body.id;
  const seat = req.body.seat;
  db.query("DELETE FROM FLIGHT_BOOKING WHERE Passenger_email = ? AND Flight_IDNum = ? AND Booked_seat = ?", [email, flight_id, seat], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("response from delete user flight sent back to client:")
      //console.log(result)
      res.send(result);
    }
  });
});

app.put("/empty-user-seat", (req, res) => {
  console.log("request coming into empty user seat:")
  console.log(req.body)
  const flight_id = req.body.id;
  const seat_num = req.body.seat;
  const seat_status = "empty"
  db.query(
    'UPDATE SEAT_INFO SET Seat_status = ? WHERE Flight_IDNum = ? AND Seat_number = ?',
    [seat_status, flight_id, seat_num],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("response from empty user seat sent back to client:")
        //console.log(result)
        res.send(result);
      }
    }
  );
});

app.get("/registered-users/:email", (req, res) => {
  console.log("params passed into registered user request:")
  console.log(req.params)
  const email = req.params.email;
  db.query("SELECT * FROM REGISTERED_USER WHERE Email = ?", [email], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("result from server:")
      //console.log(result)
      res.send(result);
    }
  });
});

app.post("/new-membership", (req, res) => {
  console.log("new membership request body:")
  console.log(req.body)
  const email = req.body.email
  const name = req.body.name
  const address = req.body.address
  const membership = req.body.membership
  const card = req.body.card
  const benefits = req.body.benefits
  db.query(
    `INSERT INTO REGISTERED_USER (Email, Name, Address, Membership, Company_card, Advantages) VALUES (?,?,?,?,?,?)
        ON DUPLICATE KEY UPDATE
        Name = VALUES(Name),
        Address = VALUES(Address),
        Membership = VALUES(Membership),
        Company_card = VALUES(Company_card),
        Advantages = VALUES(Advantages)`,
    [email, name, address, membership, card, benefits],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("result from adding registered user:")
        //console.log(result)
        res.send(result);
      }
    }
  );
});

app.delete("/delete-user-membership/:email", (req, res) => {
  console.log("request coming into delete user membership:")
  console.log(req.params)
  const email = req.params.email;
  db.query("DELETE FROM REGISTERED_USER WHERE Email = ?", [email], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("response from delete user membership sent back to client:")
      //console.log(result)
      res.send(result);
    }
  });
});

app.get("/flight-seat-list/:id", (req, res) => {
  console.log("params passed into flight seat list:")
  console.log(req.params)
  const id = req.params.id;
  db.query("SELECT * FROM SEAT_INFO WHERE Flight_IDNum = ? ORDER BY SEAT_NUMBER ASC", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("result from get flight seats:")
      //console.log(result)
      res.send(result);
    }
  });
});

app.post("/new-booking", (req, res) => {
  console.log("new booking request body:")
  console.log(req.body)
  const email = req.body.email
  const id = req.body.id
  const seat_num = req.body.seat_num
  const ticket_cancellation = req.body.ticket_cancellation
  db.query(
    `INSERT INTO FLIGHT_BOOKING (Passenger_email, Flight_IDNum, Booked_seat, Ticket_insurance) VALUES (?,?,?,?)
        ON DUPLICATE KEY UPDATE
        Flight_IDNum = VALUES(Flight_IDNum),
        Booked_seat = VALUES(Booked_seat),
        Ticket_insurance = VALUES(Ticket_insurance)`,
    [email, id, seat_num, ticket_cancellation],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("result from adding flight booking:")
        //console.log(result)
        res.send(result);
      }
    }
  );
});

app.put("/fill-user-seat", (req, res) => {
  console.log("request coming into fill user seat:")
  console.log(req.body)
  const flight_id = req.body.id;
  const seat_num = req.body.seat;
  const seat_status = "full"
  db.query(
    'UPDATE SEAT_INFO SET Seat_status = ? WHERE Flight_IDNum = ? AND Seat_number = ?',
    [seat_status, flight_id, seat_num],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("response from fill user seat sent back to client:")
        //console.log(result)
        res.send(result);
      }
    }
  );
});

app.get("/admin-password", (req, res) => {
  db.query("SELECT * FROM ADMIN_LOGIN", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("result from admin login server:")
      //console.log(result)
      res.send(result);
    }
  });
});

// ------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------------------


app.put("/update-origin", (req, res) => {
  console.log("request coming into update origin:")
  console.log(req.body)
  const id = req.body.id;
  const new_origin = req.body.new_origin;
  db.query(
    'UPDATE FLIGHT SET Origin = ? WHERE IDNum = ?',
    [new_origin, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("response from update origin sent back to client:")
        console.log(result)
        res.send(result);
      }
    }
  );
});

app.put("/update-destination", (req, res) => {
  console.log("request coming into update destination:")
  console.log(req.body)
  const id = req.body.id;
  const new_destination = req.body.new_destination;
  db.query(
    'UPDATE FLIGHT SET Destination = ? WHERE IDNum = ?',
    [new_destination, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("response from update destination sent back to client:")
        console.log(result)
        res.send(result);
      }
    }
  );
});

app.put("/update-takeoff", (req, res) => {
  console.log("request coming into update takeoff:")
  console.log(req.body)
  const id = req.body.id;
  const new_takeoff = req.body.new_takeoff;
  db.query(
    'UPDATE FLIGHT SET Start_date = ? WHERE IDNum = ?',
    [new_takeoff, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("response from update takeoff sent back to client:")
        console.log(result)
        res.send(result);
      }
    }
  );
});

app.put("/update-arrival", (req, res) => {
  console.log("request coming into update arrival:")
  console.log(req.body)
  const id = req.body.id;
  const new_arrival = req.body.new_arrival;
  db.query(
    'UPDATE FLIGHT SET End_date = ? WHERE IDNum = ?',
    [new_arrival, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("response from update arrival sent back to client:")
        console.log(result)
        res.send(result);
      }
    }
  );
});

app.put("/update-aircraft", (req, res) => {
  console.log("request coming into update aircraft:")
  console.log(req.body)
  const id = req.body.id;
  const new_aircraft = req.body.new_aircraft;
  db.query(
    'UPDATE FLIGHT SET Aircraft = ? WHERE IDNum = ?',
    [new_aircraft, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("response from update aircraft sent back to client:")
        console.log(result)
        res.send(result);
      }
    }
  );
});

// ------------------------------------------------------------------------------------------------------------------------------------------------

app.delete("/delete-flight/:id", (req, res) => {
  console.log("request params coming into delete flight:")
  console.log(req.params)
  const id = req.params.id
  db.query("DELETE FROM FLIGHT WHERE IDNum = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("response from delete flight sent back to client:")
      console.log(result)
      res.send(result);
    }
  });
});

app.post("/add-flight", (req, res) => {
  console.log("new flight body:")
  console.log(req.body)
  const id = req.body.id
  const aircraft = req.body.aircraft
  const origin = req.body.origin
  const destination = req.body.destination
  const start_date = req.body.start_date
  const end_date = req.body.end_date
  db.query(
    `INSERT INTO FLIGHT (IDNum, Aircraft, Origin, Destination, Start_Date, End_Date) VALUES (?,?,?,?,?,?)`,
    [id, aircraft, origin, destination, start_date, end_date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("result from adding flight:")
        console.log(result)
        res.send(result);
      }
    }
  );
});

// ------------------------------------------------------------------------------------------------------------------------------------------------



app.get("/view-flight-crew/:id", (req, res) => {
  console.log("params passed into view crew:")
  console.log(req.params)
  const id = req.params.id;
  db.query("SELECT * FROM CREW_MEMBER WHERE Flight_IDNum = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("result from view crew:")
      console.log(result)
      res.send(result);
    }
  });
});

app.post("/add-crew-member", (req, res) => {
  console.log("new crew member request body:")
  console.log(req.body)
  const name = req.body.name
  const role = req.body.role
  const flight_id = req.body.flight_id
  db.query(
    `INSERT INTO CREW_MEMBER (Member_name, Member_role, Flight_IDNum) VALUES (?,?,?)
        ON DUPLICATE KEY UPDATE
        Member_name = VALUES(Member_name),
        Member_role = VALUES(Member_role),
        Flight_IDNum = VALUES(Flight_IDNum)`,
    [name, role, flight_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("result from adding crew member:")
        console.log(result)
        res.send(result);
      }
    }
  );
});

app.delete("/remove-crew-member", (req, res) => {
  console.log("delete crew member request body:")
  console.log(req.body)
  const name = req.body.name
  const flight_id = req.body.flight_id
  db.query(
    `DELETE FROM CREW_MEMBER WHERE Member_name = ? AND Flight_IDNum = ?`, [name, flight_id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("result from deleting crew member:")
        console.log(result)
        res.send(result);
      }
    }
  );
});

// ------------------------------------------------------------------------------------------------------------------------------------------------

app.get("/view-aircrafts", (req, res) => {
  db.query("SELECT * FROM AIRCRAFT", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("result from view aircrafts:")
      console.log(result)
      res.send(result);
    }
  });
});

app.post("/add-aircraft/:name", (req, res) => {
  console.log("new aircraft params:")
  console.log(req.params)
  const name = req.params.name
  db.query(
    `INSERT INTO AIRCRAFT (Name) VALUES (?)
        ON DUPLICATE KEY UPDATE
        Name = VALUES(Name)`,
    [name],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("result from adding aircraft:")
        console.log(result)
        res.send(result);
      }
    }
  );
});

app.delete("/remove-aircraft/:name", (req, res) => {
  console.log("remove aircraft params:")
  console.log(req.params)
  const name = req.params.name
  db.query(
    `DELETE FROM AIRCRAFT WHERE Name = ?`, [name], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("result from deleting aircraft:")
        console.log(result)
        res.send(result);
      }
    }
  );
});

// ------------------------------------------------------------------------------------------------------------------------------------------------

app.get("/view-all-registered-users", (req, res) => {
  db.query("SELECT * FROM REGISTERED_USER", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("result from view all registered users:")
      console.log(result)
      res.send(result);
    }
  });
});

app.delete("/remove-registered-user/:email", (req, res) => {
  console.log("remove user params:")
  console.log(req.params)
  const email = req.params.email
  db.query(
    `DELETE FROM REGISTERED_USER WHERE Email = ?`, [email], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("result from deleting user:")
        console.log(result)
        res.send(result);
      }
    }
  );
});

// ------------------------------------------------------------------------------------------------------------------------------------------------

app.get("/get-max-flight-id", (req, res) => {
  db.query("select MAX(IDNum) from FLIGHT", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("result from max flight id:")
      console.log(result)
      res.send(result);
    }
  });
});

app.post("/insert-flight-seats/:id", (req, res) => {
  console.log("new insert flight body:")
  console.log(req.params)
  const id = req.params.id
  db.query(
    `INSERT INTO SEAT_INFO (Flight_IDNum, Seat_number, Seat_type, Seat_price, Seat_status) VALUES
      (?,?,?,?,?),
      (?,?,?,?,?),
      (?,?,?,?,?),
      (?,?,?,?,?),
      (?,?,?,?,?),
      (?,?,?,?,?)
        ON DUPLICATE KEY UPDATE
        Flight_IDNum = VALUES(Flight_IDNum),
        Seat_number = VALUES(Seat_number),
        Seat_type = VALUES(Seat_type),
        Seat_price = VALUES(Seat_price),
        Seat_status = VALUES(Seat_status)`,
    [id, 1, "Standard", "$100", "empty",
      id, 2, "Standard", "$100", "empty",
      id, 3, "Comfort", "$140", "empty",
      id, 4, "Comfort", "$140", "empty",
      id, 5, "Business", "$200", "empty",
      id, 6, "Business", "$200", "empty"],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("result from adding seats:")
        console.log(result)
        res.send(result);
      }
    }
  );
});

// ------------------------------------------------------------------------------------------------------------------------------------------------

app.get("/employee-password", (req, res) => {
  db.query("SELECT * FROM EMPLOYEE_LOGIN", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("result from employee login server:")
      //console.log(result)
      res.send(result);
    }
  });
});

app.post("/new-account", (req, res) => {
  console.log("new account request body:")
  console.log(req.body)
  const email = req.body.email
  const password = req.body.password
  db.query(
    `INSERT INTO USER_ACCOUNT (User_email, Login_password) VALUES (?,?)
        ON DUPLICATE KEY UPDATE
        Login_password = VALUES(Login_password)`,
    [email, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("result from adding user account:")
        //console.log(result)
        res.send(result);
      }
    }
  );
});

app.get("/get-accounts", (req, res) => {
  db.query("SELECT * FROM USER_ACCOUNT", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("result from get user accounts:")
      console.log(result)
      res.send(result);
    }
  });
});

// ------------------------------------------------------------------------------------------------------------------------------------------------

app.listen(3002, () => {
    console.log("Success, the server is running on port 3002!");
});