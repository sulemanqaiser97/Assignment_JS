let rxjs = require("rxjs");
let events = require("events");

function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function emitValue(event, range) {
  setInterval(() => {
    event.emit("data", between(range[0], range[1]));
  }, between(100, 2000));
}

const getTemperature = () => {
  let temperatureEmitter = new events.EventEmitter();
  emitValue(temperatureEmitter, [0, 10]);
  return temperatureEmitter;
};

const getAirPressure = () => {
  let airPressureEmitter = new events.EventEmitter();
  emitValue(airPressureEmitter, [10, 20]);
  return airPressureEmitter;
};

const getHumidity = () => {
  let humidityEmitter = new events.EventEmitter();
  emitValue(humidityEmitter, [20, 30]);
  return humidityEmitter;
};

const setValue = (obj, prop) => {
  return setTimeout(() => {
    obj[prop] = "N/A";
  }, 1000);
};

// captures values of temperature/airpressure and humidity emitted by different eventemitters
const observable$ = new rxjs.Observable((subscriber) => {
  let obj = {
    temperature: null,
    airPresure: null,
    humidity: null,
  };

  getTemperature().on("data", (value) => {
    obj.temperature = value;
    if (!obj.temperature && !obj.airPresure && !obj.humidity) {
      subscriber.next(obj);
    }

    let timer = null;
    if (timer != null && timer._called === false) {
      clearTimeout(timer);
      timer = setValue(obj, "temperature");
    } else {
      timer = setValue(obj, "temperature");
    }
  });
  getAirPressure().on("data", (value) => {
    obj.airPresure = value;
    if (!obj.temperature && !obj.airPresure && !obj.humidity) {
      subscriber.next(obj);
    }

    let timer = null;
    if (timer != null && timer._called === false) {
      clearTimeout(timer);
      timer = setValue(obj, "airPresure");
    } else {
      timer = setValue(obj, "airPresure");
    }
  });

  getHumidity().on("data", (value) => {
    obj.humidity = value;
    if (!obj.temperature && !obj.airPresure && !obj.humidity) {
      subscriber.next(obj);
    }

    let timer = null;
    if (timer != null && timer._called === false) {
      clearTimeout(timer);
      timer = setValue(obj, "humidity");
    } else {
      timer = setValue(obj, "humidity");
    }
  });
});

observable$.pipe(rxjs.throttleTime(100)).subscribe((object) => {
  // display values of temperature,airpressure and humidity
  console.log(object);
});
