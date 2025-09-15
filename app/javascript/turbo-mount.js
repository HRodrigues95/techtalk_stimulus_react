import { TurboMount } from "turbo-mount";
import { registerComponent } from "turbo-mount/react";

// Components
import CompletedTodos from "./component/CompletedTodos/index";

const turboMount = new TurboMount(); // or new TurboMount({ application })

registerComponent(turboMount, "CompletedTodos", CompletedTodos);
