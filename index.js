// console.log("working");

let mainCategories = [];
let categoriesWebId = [];
let subCategorycompleteData = {};

const hoverEffectBtn = document.querySelector(".hoverEffecr");
const v2navbarItemConatiner = document.querySelector(".v2navbarItemConatiner");
const subCat = document.querySelector(".subcat");
const subCatDiv = document.querySelector(".subcat>div");
const mainNavigation = document.querySelector(".v2navigaton");
const mainC = document.querySelector(".mainC");
const mobileNavCloseBtn = document.querySelectorAll(".mobileNavCloseBtn");
const mobileChildMainConatiner = document.querySelector(
  ".mobileChildCategoiresConatiner"
);
const mobileNavigationPanel = document.querySelector(".mobileNavigationPanel");
const mobileMainListConatier = document.querySelector(".mobileMainCategory");

const mobileNavigationOpen = document.querySelector(
  "#mobileViewNavigationOpen"
);

mobileNavigationOpen.addEventListener("click", () => {
  mobileNavigationPanel.style.display = "flex";
});

mobileNavCloseBtn.forEach((element) => {
  element.addEventListener("click", () => {
    mobileNavigationPanel.style.display = "none";
    mobileChildMainConatiner.style.display = "none";
  });
});

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

const setMobileMainCategory = () => {
  mainCategories.forEach((element) => {
    let node = document.createElement("li");
    let insideNode1 = document.createElement("img");
    insideNode1.src = `${element.images[0] && element.images[0].imageUrl}`;
    insideNode1.width = "95";
    insideNode1.height = "95";
    let pNode = document.createElement("p");
    pNode.innerHTML = `${element.categoryName}`;
    let insideNode2 = document.createElement("img");
    insideNode2.src = "./icons/goFor.svg";
    insideNode2.width = "32";
    insideNode2.height = "32";
    insideNode2.style.border = "none";
    insideNode2.style.marginTop = "-20";
    insideNode2.setAttribute("data-urlKey", `${element.urlKey}`);
    insideNode2.onclick = (e) => {
      setMobileSubCategory(insideNode2.getAttribute("data-urlKey"));
    };
    node.appendChild(insideNode1);
    node.appendChild(pNode);
    node.appendChild(insideNode2);
    // console.log(insideNode2);
    mobileMainListConatier.appendChild(node);
  });
};

const setMobileSubCategory = (key) => {
  const subCategoryList = subCategorycompleteData[key].subCategory;
  const childeCategoryList = subCategorycompleteData[key].childCategory;
  let u1 = document.createElement("div");
  u1.classList.add("mainCategoryHeadingholde");
  let u1BtnNode1 = document.createElement("button");
  u1BtnNode1.innerHTML = `<img src="./icons/prevBtn.svg" />`;
  u1BtnNode1.onclick = () => {
    mobileChildMainConatiner.innerHTML = "";
    mobileChildMainConatiner.style.display = "none";
  };
  u1.appendChild(u1BtnNode1);
  let u1p = document.createElement("p");
  u1p.innerHTML = `${key}`;
  let u1btn2 = document.createElement("button");
  u1btn2.innerHTML = `&#x2715;`;
  u1btn2.classList.add("closeBtn");
  u1btn2.classList.add("mobileNavCloseBtn");
  u1btn2.onclick = () => {
    mobileNavigationPanel.style.display = "none";
    mobileChildMainConatiner.style.display = "none";
  };
  u1.appendChild(u1p);
  u1.appendChild(u1btn2);
  // console.log(subCategoryList);
  //   adding real lists

  let fullChilds = document.createElement("div");
  fullChilds.classList.add("mobilechildCategorylist");

  subCategoryList.forEach((el) => {
    let subCcat = document.createElement("div");
    subCcat.classList.add("mobilechildCategory");
    subCcat.innerHTML = `<div class="mobilechildCategoryHeading">
            ${el.categoryName}
            <div class="movilechildheadline"></div>
          </div>`;
    // console.log(el);
    let ulSubCat = document.createElement("ul");
    ulSubCat.classList.add("mobileActualChildCategoryList");

    let filteredData = childeCategoryList.filter((l) => l.parentId === el.id);
    // console.log(filteredData);
    filteredData.forEach((k) => {
      let childNode = document.createElement("li");
      childNode.classList.add("mobileChildcategorylistItem");
      childNode.innerHTML = `<img src="" width="95px" height="95px" />
              <p>${k.categoryName}</p>`;
      ulSubCat.appendChild(childNode);
      // console.log(k.images);
    });

    subCcat.appendChild(ulSubCat);
    fullChilds.appendChild(subCcat);
  });

  //   console.log(fullChilds);
  mobileChildMainConatiner.appendChild(u1);
  mobileChildMainConatiner.appendChild(fullChilds);
  // console.log(mobileChildMainConatiner);
  
  mobileChildMainConatiner.style.display = "block";
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
      window.innerWidth > 786 ? setMainCategories() : setMobileMainCategory();
      subcatergoriesdetailsFetch();
    }
  };
};

fetchMenuItems();
