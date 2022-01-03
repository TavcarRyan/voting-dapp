// REACT
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// MATERIAL-UI
import { Modal, Grid, Button, TextField } from "@material-ui/core";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// COMPONENTS
import MobileModalHeader from "../common/MobileModalHeader";

// ASSETS
import { PollStyles } from "./styles";
import { Helper } from "../../utils/helpers";
import moment from "moment";
import { ethers } from "ethers";
import { hasEthereum } from "../../utils/ethereum";
import Poll from "../../artifacts/contracts/Poll.sol/Poll.json";
import useContract from "../../utils/useContract";

interface CreatePollProps {
  modalOpen: boolean;
  toggleCreatePollModal: () => void;
}

const defaultValues = {
  title: "",
  options: ["Default option"],
  estimatedBlockHeight: undefined,
};

const defaultCalendarValues = {
  opened: false,
  selectedDate: undefined,
  minTime: Helper.calculateMinTime(new Date()),
};

const BLOCK_TIME = 14.5;
const BLOCK_HEIGHT = 0;

const CreatePoll = (props: CreatePollProps) => {
  const classes = PollStyles();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { signerContract, providerContract, signer, provider } = useContract(
    Poll.abi,
    process.env.REACT_APP_POLL_ADDRESS
  );

  const [formValues, setFormValues] = React.useState(defaultValues);
  const [calendar, setCalendar] = React.useState(defaultCalendarValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleOptionsChange = (index) => (e) => {
    const { value } = e.target;
    let newArr = [...formValues.options];
    newArr[index] = value;

    setFormValues({
      ...formValues,
      options: newArr,
    });
  };

  const calendarSelectorOnChangeHandler = (
    date: Date | null,
    event: React.SyntheticEvent<any, Event> | undefined
  ) => {
    if (!date) {
      return;
    }

    const clonedCalendar = Object.assign({}, calendar);
    clonedCalendar.minTime = Helper.calculateMinTime(date);
    clonedCalendar["selectedDate"] = date;
    setCalendar((prev) => ({ ...prev, ...clonedCalendar }));

    const futureTime = date.getTime();
    const currentTime = Date.now();
    const currentBlockHeight = BLOCK_HEIGHT;
    const estimated = String(
      Helper.getEstimatedBlockNumber(
        currentTime,
        currentBlockHeight,
        futureTime
      )
    );
    setFormValues({
      ...formValues,
      estimatedBlockHeight: estimated,
    });
  };

  const calendarSelectorOnSelectOutsideHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const clonedCalendar = Object.assign({}, calendar);
    clonedCalendar.opened = false;
    setCalendar((prev) => ({ ...prev, ...clonedCalendar }));
  };

  const appendOption = () => {
    setFormValues({
      ...formValues,
      options: [...formValues.options, ""],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formValues);
    const transaction = await signerContract._createPoll(
      formValues.title,
      formValues.options,
      formValues.estimatedBlockHeight,
      1
    );

    await transaction.wait();
    console.log("transaction: ", transaction);
  };

  const getPoll = async () => {
    const tx = await signerContract.getPoll(1);
    console.log("tx: ", tx);
  };

  return (
    <Modal open={props.modalOpen} onClose={props.toggleCreatePollModal}>
      <Grid container className={classes.createPollContainer}>
        {isMobile && (
          <MobileModalHeader
            title="All Polls"
            onClose={props.toggleCreatePollModal}
          />
        )}
        <form onSubmit={handleSubmit} className={classes.formContainer}>
          <Grid container>
            <Grid item xs={12} className={classes.inputField}>
              <TextField
                fullWidth
                id="title-input"
                name="title"
                label="Title"
                type="text"
                value={formValues.title}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} className={classes.inputField}>
              <TextField
                fullWidth
                id="block-input"
                name="block"
                label="Block"
                type="number"
                value={formValues.estimatedBlockHeight || ""}
                placeholder="When will the poll expire?"
                // onChange={handleInputChange}
                onClick={() =>
                  setCalendar((prev) => ({ ...prev, opened: true }))
                }
              />
              {calendar.opened && (
                <DatePicker
                  open={true}
                  className={classes.datePickerInput}
                  popperClassName={classes.datePickerPopper}
                  selected={calendar.selectedDate}
                  onChange={calendarSelectorOnChangeHandler}
                  onClickOutside={calendarSelectorOnSelectOutsideHandler}
                  showTimeSelect={true}
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  timeCaption="time"
                  //   calendarContainer={() => (
                  //     <div className={classes.datePickerWrapper}>
                  //       <div className={classes.datePickerHint}>
                  //         <p>
                  //           Estimate future block height by{" "}
                  //           <span style={{ fontStyle: "italic" }}>
                  //             block time of
                  //             <br /> ~{BLOCK_TIME} seconds
                  //           </span>
                  //         </p>
                  //         <p style={{ fontStyle: "italic" }}>
                  //           Disclaimer: the block time of Ethereum network <br />
                  //           varies in reality
                  //         </p>
                  //       </div>
                  //     </div>
                  //   )}
                  minDate={new Date()}
                  minTime={calendar.minTime}
                  maxTime={moment().endOf("day").toDate()}
                />
              )}
            </Grid>
            <Grid item xs={12} container className={classes.inputField}>
              {formValues.options.map((option, i) => (
                <Grid key={i} item xs={12} className={classes.optionInput}>
                  <TextField
                    fullWidth
                    name="options"
                    label="Options"
                    type="text"
                    value={option}
                    onChange={handleOptionsChange(i)}
                  />
                </Grid>
              ))}
              <Grid item xs={12} md={3}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={appendOption}
                >
                  Add Option
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.buttonContainer}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        {/* <Button fullWidth variant="contained" color="primary" onClick={getPoll}>
          get Poll
        </Button> */}
      </Grid>
    </Modal>
  );
};

export default CreatePoll;
