document.addEventListener("DOMContentLoaded", function () {
    const submit_item = document.querySelector("#form");
    const items_list = document.querySelector("#items");
    const searchbox = document.querySelector("#searchbox");

    function add_item(e) {
        e.preventDefault();
        let new_value = document.getElementById("new").value;
        let li = document.createElement("li");
        li.className = "list_items";
        li.appendChild(document.createTextNode(new_value));
        items_list.appendChild(li);

        let delete_button = document.createElement("button");
        delete_button.className = "delete";
        delete_button.appendChild(document.createTextNode("Remove"));
        li.appendChild(delete_button);
        document.querySelector("#new").value = "";

        
        if (items_list.children.length == 0) {
            items_list.classList.add("bg");
        } else {
            items_list.classList.remove("bg");
        }
    }
    function remove_item(e) {
        if (e.target.classList.contains("delete")) {
            if (confirm("Are you sure you want to delete this?")) {
                let li = e.target.parentElement;
                items_list.removeChild(li);
            }
            if (items_list.children.length == 0) {
                items_list.classList.add("bg");
            }
            if (items_list.children.length != 0) {
                items_list.classList.remove("bg");
            }
        }
    }
    function filter_item(e) {
        let converted_to_lower = e.target.value.toLowerCase();
        const array_of_blocked_items = [];

        let items = document.querySelectorAll(".list_items");

        items.forEach((item) => {
            let item_name = item.firstChild.textContent;
            if (item_name.toLowerCase().indexOf(converted_to_lower) != (-1)) {
                item.classList.remove("none");
            } else {
                item.classList.add("none");
            }
            array_of_blocked_items.push(String(item.classList.contains("none")));
        });
        const contains_none = [];
        const not_contains_none = [];
        for(let k = 0; k<array_of_blocked_items.length; k++){
            if(array_of_blocked_items[k] == "true"){
                contains_none.push(array_of_blocked_items[k]);
            }
            if (array_of_blocked_items[k] == "false"){
                not_contains_none.push(array_of_blocked_items[k]);
            }
        }

        if(contains_none.length == items.length){
            items_list.classList.add("bg");
        } else {
            items_list.classList.remove("bg");
        }
    }
    submit_item.onsubmit = add_item;
    items_list.onclick = remove_item;
    searchbox.addEventListener("keyup", filter_item);
});
