import timerSchema from "../models/timer.model.js";

/*
class TimerService {
  async createTimer(userId, taskId, type, duration) {
    const timerData = { userId, taskId, type, duration };
    const timerSaved = await timerSchema.create(timerData);
    return timerSaved;
  }
  async startTimer(timerId) {
    const timerFound = await timerSchema.findById(timerId);
    if (!timerFound) {
      throw boom.notFound("Timer not found");
    }
    if (timerFound.status === "active") {
      throw boom.badRequest("Timer is not paused");
    }
    const timer = await timerSchema.findByIdAndUpdate(
      timerId,
      {
        status: "active",
        startTime: new Date(),
      },
      { new: true }
    );
    return timer;
  }
  async pauseTimer(timerId) {
    const timer = await timerSchema.findById(timerId);
    if (!timer) {
      throw boom.notFound("Timer not found");
    }
    if (timer.status === "paused") {
      throw boom.badRequest("Timer is already paused");
    }
    // calcular el tiempo restante previo si existe, o del tiempo original
    const elapsedTime = (new Date() - timer.startTime) / 1000;
    const newRemainingTime =
      (timer.remainingTime !== null ? timer.remainingTime : timer.duration) -
      elapsedTime;

    // cambio de estados del temporizador, y devuelve el temporizador actualizado
    const timerUpdated = await timerSchema.findByIdAndUpdate(
      timerId,
      {
        status: "paused",
        remainingTime: newRemainingTime >= 0 ? newRemainingTime : 0,
        startTime: null,
      },
      { new: true }
    );

    return timerUpdated;
  }
  async resumeTimer(timerId) {
    const timer = await timerSchema.findById(timerId);
    if (!timer) {
      throw boom.notFound("Timer not found");
    }
    if (timer.status === "active") {
      throw boom.badRequest("Timer is not paused");
    }
    const timerUpdated = await timerSchema.findByIdAndUpdate(
      timerId,
      {
        status: "active",
        startTime: new Date(),
      },
      { new: true }
    );
    return timerUpdated;
  }
  async getTimerStatus(timerId) {
    const timer = await timerSchema.findById(timerId);
    if (!timer) {
      throw boom.notFound("Timer not found");
    }
    if (timer.status === "active") {
      const now = new Date();
      // Calcular el tiempo transcurrido desde que se inicio el temporizador
      const elapsedTimeInSeconds =
        (now.getTime() - timer.startTime.getTime()) / 1000;
      let newRemainingTime;

      if (timer.remainingTime !== null) {
        newRemainingTime = timer.remainingTime - elapsedTimeInSeconds;
      } else {
        newRemainingTime = timer.duration - elapsedTimeInSeconds;
      }
      // Si el tiempo se agoto
      if (newRemainingTime <= 0) {
        timer.status = "finished";
        timer.remainingTime = 0;
        timer.startTime = null;
        await timer.save();
      } else {
        timer.remainingTime = newRemainingTime;
      }
    }
    return timer;
  }
  async deleteTimer(timerId) {
    const timer = await timerSchema.findByIdAndDelete(timerId);
    if (!timer) {
      throw boom.notFound("Timer not found");
    }
    return timer;
  }
}
*/
export default TimerService;
