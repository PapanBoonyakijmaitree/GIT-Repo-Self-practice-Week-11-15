document.addEventListener("DOMContentLoaded", () => {

    // Fake API Data
    let students = [
        {id:1, name:"Alice", age:17, email:"alice@mail.com"},
        {id:2, name:"Bob", age:19, email:"bob@mail.com"},
        {id:3, name:"Charlie", age:18, email:"charlie@mail.com"},
    ];

    // HTML Elements
    const tbody = document.getElementById("studentBody");
    const ageFilter = document.getElementById("ageFilter");
    const tzSelect = document.getElementById("tzSelect");
    const currentTime = document.getElementById("currentTime");
    const studentNameInput = document.getElementById("studentName");
    const studentAgeInput  = document.getElementById("studentAge");
    const studentEmailInput= document.getElementById("studentEmail");
    const addBtn   = document.getElementById("addBtn");
    const updateBtn= document.getElementById("updateBtn");
    const cancelEdit = document.getElementById("cancelEdit");
    const filterInput = document.getElementById("filterInput");

    let editingId = null;

    // Render Table
    function renderTable(list){
        tbody.innerHTML="";
        list.forEach(s=>{
            const row = document.createElement("tr");
            row.innerHTML = `<td>${s.id}</td><td>${s.name}</td><td>${s.age}</td><td>${s.email}</td>`;
            row.onclick = ()=> startEdit(s.id);
            tbody.appendChild(row);
        });
    }

    renderTable(students);

    // Filter by minimum age
    document.getElementById("filterBtn").onclick = ()=>{
        const minAge = Number(ageFilter.value);
        if(minAge) renderTable(students.filter(s=>s.age>=minAge));
    };

    document.getElementById("resetFilter").onclick = ()=>{
        ageFilter.value="";
        renderTable(students);
    };

    // Sort by name
    document.getElementById("sortBtn").onclick = ()=>{
        renderTable([...students].sort((a,b)=>a.name.localeCompare(b.name)));
    };

    // Filter by name input
    filterInput.addEventListener("input", ()=>{
        const val = filterInput.value.toLowerCase();
        const filtered = students.filter(s => s.name.toLowerCase().includes(val));
        renderTable(filtered);
    });
});