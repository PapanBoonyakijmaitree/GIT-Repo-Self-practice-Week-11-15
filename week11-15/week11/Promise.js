// เขียนฟังก์ชันชื่อ checkWeather ที่รับ parameter isRaining
// 	•	ถ้า isRaining = true → reject "Take umbrella"
// 	•	ถ้า isRaining = false → resolve "No umbrella needed"

function checkWeather(isRaining) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      isRaining ? reject("Take umbrella") : resolve("No umbrella needed")
    }, 2000)
  })
}

checkWeather(true)
  .then(res => console.log(res))
  .catch(err => console.log(err))

// async/await
async function runWeather() {
  try {
    const status = await checkWeather(false)
    console.log(status)
  } catch (error) {
    console.log(error)
  }
}
runWeather()

// ใช้ fetch ดึงข้อมูลจาก https://jsonplaceholder.typicode.com/posts
// 	•	แสดง post ทั้งหมดใน console
// 	•	ใช้ async/await

async function loadPosts() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await res.json()
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
loadPosts()

// สร้าง array ชื่อ tasks = []
// 	•	สร้าง async functions สำหรับ
// 	1.	createTask(task) → เพิ่ม task
// 	2.	getTasks() → แสดง tasks
// 	3.	updateTask(index, newTask) → แก้ไข task
// 	4.	deleteTask(index) → ลบ task

let tasks = []

async function createTask(task) {
  tasks.push(task)
  return tasks
}

async function getTasks() {
  return tasks
}

async function updateTask(index, newTask) {
  tasks[index] = newTask
  return tasks
}

async function deleteTask(index) {
  tasks.splice(index, 1)
  return tasks
}

// Test
(async () => {
  await createTask("Learn JS")
  await createTask("Learn Async")
  console.log(await getTasks())
  await updateTask(0, "Master JS")
  console.log(await getTasks())
  await deleteTask(1)
  console.log(await getTasks())
})()