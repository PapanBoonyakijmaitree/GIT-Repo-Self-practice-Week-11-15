document.addEventListener("DOMContentLoaded", ()=>{

    // Fake API Data
    let students = [
        {id:1,name:"Alice",age:17,email:"alice@mail.com"},
        {id:2,name:"Bob",age:19,email:"bob@mail.com"},
        {id:3,name:"Charlie",age:18,email:"charlie@mail.com"},
        ];

    const tbody = document.getElementById("studentBody");
    const ageFilter = document.getElementById("ageFilter");
    const tzSelect = document.getElementById("tzSelect");
    const currentTime = document.getElementById("currentTime");
    const studentIdInput = document.getElementById("studentId");
    const studentNameInput = document.getElementById("studentName");
    const studentAgeInput = document.getElementById("studentAge");
    const studentEmailInput = document.getElementById("studentEmail");
    const addBtn = document.getElementById("addBtn");
    const updateBtn = document.getElementById("updateBtn");
    const cancelEdit = document.getElementById("cancelEdit");
    const studentForm = document.getElementById("studentForm");
    const confirmDialog = document.getElementById("confirmDialog");
    const confirmText = document.getElementById("confirmText");
    const confirmYes = document.getElementById("confirmYes");
    const confirmNo = document.getElementById("confirmNo");

    let editingId = null;

    function renderTable(list){
        tbody.innerHTML="";
        list.forEach(s=>{
            const row=document.createElement("tr");
            row.innerHTML=`<td>${s.id}</td><td>${s.name}</td><td>${s.age}</td><td>${s.email}</td>`;
            row.onclick = ()=>startEdit(s.id);
            tbody.appendChild(row);
        });
    }

    renderTable(students);

    //Filter + Sort
    document.getElementById("filterBtn").onclick = ()=>{
        const minAge = Number(ageFilter.value);
        if(minAge) renderTable(students.filter(s=>s.age>=minAge));
    };
    document.getElementById("resetFilter").onclick = ()=>{
        ageFilter.value="";
        renderTable(students);
    };
    document.getElementById("sortBtn").onclick = ()=>{
        renderTable([...students].sort((a,b)=>a.name.localeCompare(b.name)));
    };

    //Timezone
    function updateTime(){
        const tz = tzSelect.value || "Asia/Bangkok";
        const now = new Date();
        currentTime.textContent = now.toLocaleString("en-GB",{timeZone:tz});
    }
    setInterval(updateTime,1000);
    tzSelect.onchange = updateTime;
    updateTime();


});