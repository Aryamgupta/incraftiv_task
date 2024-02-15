console.log("working");

let mainCategories = [];
let categoriesWebId = [];
let subCategorycompleteData = {};

const hoverEffectBtn = document.querySelector(".hoverEffecr");
const v2navbarItemConatiner = document.querySelector(".v2navbarItemConatiner");
const subCat = document.querySelector(".subcat");
const subCatDiv = document.querySelector(".subcat>div");
const mainNavigation = document.querySelector(".v2navigaton");
const mainC = document.querySelector(".mainC");

// hoverEffectBtn.onmouseover = () => {
//   subCat.style.display = "block";
// };

// hoverEffectBtn.onmouseout = () => {

// };

const setMainCategories = () => {
  mainCategories.forEach((element) => {
    let node = document.createElement("li");
    node.classList.add("nav-item");
    node.setAttribute("data-categoryName", element.urlKey);
    node.onmouseover = () => {
      node.classList.add("borderColorChnge");
      subCat.setAttribute("data-category", element.urlKey);
      cleanAllSubCat();
      window.innerWidth > 786 && subCat.classList.remove("displayNone");
      setSubCategory(node.getAttribute("data-categoryName"));
    };
    node.onmouseout = () => {
      node.classList.remove("borderColorChnge");
    };
    node.innerHTML = `<a class="nav-link active" aria-current="page" href="#">${element.categoryName.toUpperCase()}</a>`;

    v2navbarItemConatiner.appendChild(node);
  });
};

const setSubCategory = (key) => {
  const subCategoryList = subCategorycompleteData[key].subCategory;
  const childeCategoryList = subCategorycompleteData[key].childCategory;
  subCategoryList.forEach((element) => {
    let node = document.createElement("ul");
    node.setAttribute("data-subCategoryId", element.id);
    node.classList.add("subCategori");
    let insideNode = document.createElement("li");
    insideNode.classList.add("childCategory");
    insideNode.innerHTML = `<a href="#">${element.categoryName.toUpperCase()}</a>`;
    node.appendChild(insideNode);
    subCatDiv.appendChild(node);
    const childCategoryData = childeCategoryList.filter(
      (el) => el.parentId === element.id
    );
    childCategoryData.forEach((child) => {
      const childNode = document.createElement("li");
      childNode.classList.add("childCategory");
      childNode.innerHTML = `<a href="#">${child.categoryName.toUpperCase()}</a>`;
      node.appendChild(childNode);
    });
  });
  console.log(subCategoryList);
};

const setChildCategory = (id, childCategoryList) => {
  const filterdData = childCategoryList.filter((ele) => ele.parentId === id);
  return filterdData;
};

const cleanAllSubCat = () => {
  subCatDiv.innerHTML = "";
};

mainC.onmouseover = (e) => {
  document.querySelectorAll(".nav-item").forEach((element) => {
    element.classList.remove("borderColorChnge");
  });
  subCat.classList.add("displayNone");
};

subCat.onmouseover = () => {
  document.querySelectorAll(".nav-item").forEach((element) => {
    if (
      element.getAttribute("data-categoryName") ===
      subCat.getAttribute("data-category")
    ) {
      element.classList.add("borderColorChnge");
    }
  });
};

const subcatergoriesdetailsFetch = async () => {
  categoriesWebId.forEach((element) => {
    let rel = new XMLHttpRequest();
    rel.open(
      "GET",
      `https://ecomm.dotvik.com/v2kart/service/categories/${element}/tree`,
      true
    );
    rel.send();
    rel.onreadystatechange = () => {
      if (rel.readyState === 4 && rel.status === 200) {
        subCategorycompleteData[`${element}`] = JSON.parse(
          rel.responseText
        ).data;
      }
    };
  });
  //   console.log(subCategorycompleteData);
};

const fetchMenuItems = async () => {
  let req = new XMLHttpRequest();
  req.open(
    "GET",
    "https://ecomm.dotvik.com/v2kart/service/categories/mainCategories",
    true
  );
  req.send();
  req.onreadystatechange = () => {
    if (req.readyState === 4 && req.status === 200) {
      mainCategories = JSON.parse(req.responseText).data;
      mainCategories.forEach((element) => {
        categoriesWebId.push(element.urlKey);
      });
      setMainCategories();
      subcatergoriesdetailsFetch();
    }
  };
};

fetchMenuItems();
