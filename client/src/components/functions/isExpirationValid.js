function isExpirationValid(selectedDate) {
    const today = new Date();
    const selectedDateTime = new Date(selectedDate).getTime();
    const todayTime = today.setHours(0, 0, 0, 0);
    return selectedDateTime >= todayTime;
}