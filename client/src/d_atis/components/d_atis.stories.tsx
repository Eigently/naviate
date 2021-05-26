/** @jsxImportSource @emotion/react */
import { ComponentProps } from "react";
import { Story } from "@storybook/react";

import { light_theme } from "../../theme/colors/light_theme";
import { dark_theme } from "../../theme/colors/dark_theme";

import { DAtis } from "./d_atis";
import { Surrounding } from "../../storybook/surrounding";

export default {
  title: "Aviation/D-ATIS",
  component: DAtis,
  argTypes: {
    handle_get_d_atis: { action: "handle_get_d_atis" },
  },
};

const Template: Story<ComponentProps<typeof DAtis>> = (args) => (
  <Surrounding args={args}>
    <DAtis {...args} />
  </Surrounding>
);

export const Light = Template.bind({});
Light.args = {
  theme_object: light_theme,
  d_atis_data: {
    status: "succeeded",
    data: {
      icao_code: "KATL",
      d_atis_type: "SEPARATED",
      d_atis_departure:
        "ATL ARR INFO F 0052Z. 27006KT 10SM FEW100 FEW250 27/13 A3012 (THREE ZERO ONE TWO). SIMULTANEOUS APCHS IN USE VIS 26R, ILS 27L, VIS 28. NOTAMS... TWY SJ CLSD. RWY 26R TDZL OTS. ILS RWY 27R OTS. CRANE 260 FEET AGL ABOVE MAIN TERMINAL. CRANE 135 FEET AGL WEST END OF TAXIWAY ECHO. BIRD ACTIVITY VC OF ARPT. UAS ACTIVITY 5 MILES NW OF ATLANTA AIRPORT BELOW 200 FEET. OPERATE TRANSPONDER WITH MODE C ON ALL RAMPS, TWYS AND RWYS.. ...ADVS YOU HAVE INFO F.",
      d_atis_arrival:
        "ATL DEP INFO R 0052Z. 27006KT 10SM FEW100 FEW250 27/13 A3012 (THREE ZERO ONE TWO). SIMUL DEPS, DEPG RWYS, 26L, 27R. XPECT RNAV OFF THE GROUND DEPTG RWY 26L, XPECT RNAV OFF THE GROUND DEPTG RWY 27R. GROUND CONTROL WILL ASSIGN RUNWAY WITH TAXI INSTRUCTIONS. NOTAMS... TWY SJ CLSD. CRANE 260 FEET AGL ABOVE MAIN TERMINAL. CRANE 135 FEET AGL WEST END OF TAXIWAY ECHO. BIRD ACTIVITY VC OF ARPT. UAS ACTIVITY 5 MILES NW OF ATLANTA AIRPORT BELOW 200 FEET. OPERATE TRANSPONDER WITH MODE C ON ALL RAMPS, TWYS AND RWYS.. ...ADVS YOU HAVE INFO R.",
    },
  },
};

/**
 * The thing can also be dark...
 */
export const Dark = Template.bind({});
Dark.args = {
  theme_object: dark_theme,
  d_atis_data: {
    status: "succeeded",
    data: {
      icao_code: "KATL",
      d_atis_type: "SEPARATED",
      d_atis_departure:
        "ATL ARR INFO F 0052Z. 27006KT 10SM FEW100 FEW250 27/13 A3012 (THREE ZERO ONE TWO). SIMULTANEOUS APCHS IN USE VIS 26R, ILS 27L, VIS 28. NOTAMS... TWY SJ CLSD. RWY 26R TDZL OTS. ILS RWY 27R OTS. CRANE 260 FEET AGL ABOVE MAIN TERMINAL. CRANE 135 FEET AGL WEST END OF TAXIWAY ECHO. BIRD ACTIVITY VC OF ARPT. UAS ACTIVITY 5 MILES NW OF ATLANTA AIRPORT BELOW 200 FEET. OPERATE TRANSPONDER WITH MODE C ON ALL RAMPS, TWYS AND RWYS.. ...ADVS YOU HAVE INFO F.",
      d_atis_arrival:
        "ATL DEP INFO R 0052Z. 27006KT 10SM FEW100 FEW250 27/13 A3012 (THREE ZERO ONE TWO). SIMUL DEPS, DEPG RWYS, 26L, 27R. XPECT RNAV OFF THE GROUND DEPTG RWY 26L, XPECT RNAV OFF THE GROUND DEPTG RWY 27R. GROUND CONTROL WILL ASSIGN RUNWAY WITH TAXI INSTRUCTIONS. NOTAMS... TWY SJ CLSD. CRANE 260 FEET AGL ABOVE MAIN TERMINAL. CRANE 135 FEET AGL WEST END OF TAXIWAY ECHO. BIRD ACTIVITY VC OF ARPT. UAS ACTIVITY 5 MILES NW OF ATLANTA AIRPORT BELOW 200 FEET. OPERATE TRANSPONDER WITH MODE C ON ALL RAMPS, TWYS AND RWYS.. ...ADVS YOU HAVE INFO R.",
    },
  },
};

export const LightCombined = Template.bind({});
LightCombined.args = {
  theme_object: light_theme,
  d_atis_data: {
    status: "succeeded",
    data: {
      icao_code: "KJFK",
      d_atis_type: "COMBINED",
      d_atis_combined:
        "JFK ATIS INFO U 0051Z. 21012KT 10SM FEW050 SCT095 BKN110 BKN160 BKN250 19/17 A2991 (TWO NINER NINER ONE) RMK LTG DSNT SE RAE45 TSE24. APPROACH IN USE ILS RY 22L, ILS RY 22R. DEPG RY 22R. NOTAMS... RWY 13R, 31L CLSD, RWY 13L, 31R CLSD. JFK VOR OTS. HAZD WX INFO FOR NY METRO AREA AVBL ON FSS. SWAP IN EFFECT EXPECT REROUTES. BIRD ACTIVITY VICINITY ARPT. NUM CRANES OPERATING AT JFK. READBACK ALL RWY HOLD SHORT INSTRUCTIONS. ...ADVS YOU HAVE INFO U.",
    },
  },
};

export const Loading = Template.bind({});
Loading.args = {
  theme_object: light_theme,
  d_atis_data: {
    status: "loading",
  },
};

export const Failed = Template.bind({});
Failed.args = {
  theme_object: light_theme,
  d_atis_data: {
    status: "failed",
    error: "Invalid or Unsupported ICAO Code.",
  },
};
