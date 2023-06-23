// Function to get the current date and time and to format the date and time
module.exports = {
    formatTime: (date) => {
      return date.toLocaleTimeString();
    },
    formatDate: (date) => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
        new Date(date).getFullYear()
      }`;
    },
  };
