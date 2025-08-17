
const btnEl = document.getElementById("btn")! as HTMLButtonElement;
const inputEl = document.getElementById("input")! as HTMLInputElement;
const formEl = document.querySelector("form")!;
const listEl = document.getElementById("list")!;
const dbtnEl = document.getElementById("dbtn")! as HTMLButtonElement;
declare const Swal: any;  // เพิ่มบรรทัดนี้ด้านบน


interface Task {
    name: string;
    completed: boolean;
}

// อ่านข้อมูลจาก localStorage
const readData = (): Task[] => {
    const myList = localStorage.getItem("myList");
    return myList ? JSON.parse(myList) : [];
}

// array เก็บ task
const task: Task[] = readData();

// บันทึกข้อมูลกลับ localStorage
const updateData = () => {
    localStorage.setItem("myList", JSON.stringify(task));
}

// ลบข้อมูลทั้งหมด
const deleteData = (): void => {
    listEl.replaceChildren();   // เคลียร์หน้าเว็บ
    task.length = 0;            // เคลียร์ array
    localStorage.removeItem("myList"); // เคลียร์ localStorage
}

// สร้าง list item
const createList = (task: Task) => {
    const liEl = document.createElement("li");
    const checkboxEl = document.createElement("input");
    checkboxEl.type = "checkbox";
    checkboxEl.checked = task.completed;

    liEl.textContent = task.name + " "; // เว้นวรรคก่อน checkbox
    liEl.appendChild(checkboxEl);
    listEl.appendChild(liEl);

    checkboxEl.addEventListener("change", () => {
        task.completed = checkboxEl.checked;
        updateData();

        if (checkboxEl.checked) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            Swal.fire({
                title: "Cancel!",
                text: "You didn't it!",
                icon: "error",
            });
        }

        console.log(task.completed);
    });
}

// เพิ่ม task ใหม่
const saveData = (e: SubmitEvent): void => {
    e.preventDefault();
    const value = inputEl.value.trim();
    if (!value) return; // ป้องกันใส่ค่าว่าง

    const newTask: Task = {
        name: value,
        completed: false
    };

    task.push(newTask);
    createList(newTask);
    updateData();
    inputEl.value = "";
}

// โหลด task เดิม
task.forEach(createList);

// event binding
formEl.addEventListener("submit", saveData);
dbtnEl.addEventListener("click", deleteData);
