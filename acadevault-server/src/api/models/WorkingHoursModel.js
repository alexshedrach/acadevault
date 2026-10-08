import mongoose from "mongoose";

const { Schema } = mongoose;

const workingHoursSchema = new Schema(
  {
    day: {
      type: String,
      required: true,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    open: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(v),
        message: (props) => `${props.value} is not a valid opening time.`,
      },
    },
    close: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(v),
        message: (props) => `${props.value} is not a valid closing time.`,
      },
    },
    isClosed: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
    validate: {
      validator: function () {
        if (this.isClosed) return true; // Skip validation if closed
        const openTime = this.open.split(":").map(Number);
        const closeTime = this.close.split(":").map(Number);
        return (
          openTime[0] < closeTime[0] ||
          (openTime[0] === closeTime[0] && openTime[1] < closeTime[1])
        );
      },
      message: "Opening time must be earlier than closing time.",
    },
  }
);

export const WorkingHours = workingHoursSchema;
