export const updateTimeTableData = async () => {
  const className = localStorage.getItem("class_name");
  const lessons = JSON.parse(localStorage.getItem("lessons"));
  const query = await fetch(
    `api/get_classes?class=${className}&elective_subjects=${lessons.join(",")}`
  );
  const dataJson = await query.json();
  const data = dataJson["results"];
  const version = dataJson["version"];

  const colorQuery = await fetch(`api/get_class_colors?class=${className}`)
  const colorJson = await colorQuery.json();
  const colorData = colorJson["results"];

  localStorage.setItem("TimePlanData", JSON.stringify(data));
  localStorage.setItem("version", JSON.stringify(version));
  localStorage.setItem("colors", JSON.stringify(colorData));
  console.log(version);
  location.reload();
};

export const checkVersion = async () => {
  const prevVersionLS = localStorage.getItem("version");
  if (!prevVersionLS) {
    return;
  }

  const prevVersion = JSON.parse(prevVersionLS);

  const className = localStorage.getItem("class_name");

  const query = await fetch(`api/get_class_version?class=${className}`);
  const dataJson = await query.json();
  const newVersion = parseInt(dataJson["results"]);

  if (prevVersion !== newVersion) {
    updateTimeTableData();
  }
};
