export class touristSpots {
    constructor() {
        // Array com os cards iniciais.
        this.list = [
            {
                itemImage: "../img/pao-de-acucar.png",
                itemTitle: "Pão de Açúcar",
                itemDescription:
                    "Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.",
            },
            {
                itemImage: "../img/cristo-redentor.png",
                itemTitle: "Cristo Redentor",
                itemDescription:
                    "Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.",
            },
            {
                itemImage: "../img/ilha-grandes.png",
                itemTitle: "Ilha Grandes",
                itemDescription:
                    "Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.",
            },
            {
                itemImage: "../img/centro-historico.png",
                itemTitle: "Centro Histórico de Paraty",
                itemDescription:
                    "Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.",
            },
        ];

        // Invocadores das funções.
        this.selectors();
        this.events();
        this.slick();
        this.renderArray();
    }

    // Seletores puxando o HTML.
    selectors() {
        this.inputTitle = document.querySelector(".input-title");
        this.inputDescription = document.querySelector(".input-description");
        this.buttonSubmit = document.querySelector(".button-submit");
        this.labelFile = document.querySelector(".form-input-file");
        this.inputFile = document.querySelector("#input-file");
        this.spanPreview = document.querySelector(".span-preview");
        this.containerItem = document.querySelector(".container-item-list");
        this.itemList = document.querySelectorAll(".item-list");
        this.form = document.querySelector(".container-form");
    }

    // Escutadores de eventos.
    events() {
        this.form.addEventListener("submit", this.addTouristSpots.bind(this));
        this.inputFile.addEventListener("change", this.filePreview.bind(this));
    }

    // Preview do Input file.
    filePreview(e) {
        const inputTarget = e.target;
        const file = inputTarget.files[0];

        if (file) {
            let reader = new FileReader();

            reader.addEventListener("load", (e) => {
                const readerTarget = e.target;
                const img = document.createElement("img");

                img.src = readerTarget.result;
                img.classList.add("span-preview-img");

                this.spanPreview.innerHTML = "";
                this.spanPreview.appendChild(img);

                this.labelFile.style.display = "block";
            });
            reader.readAsDataURL(file);
            e.target.value = "";
        }
    }

    // Renderiza as arrays.
    renderArray() {
        let newHTML = "";

        this.list.forEach((item) => {
            newHTML += `
            <div class="item-list" data-test="item-list">
                <figure class="figure-item-list">
                    <img src="${item.itemImage}" class="image-item-list" data-test="image-item-list"
                    alt="${item.itemTitle}">

                    <figcaption class="figcaption-item-list">
                        <h2 class="title-item-list" data-test="title-item-list"
                        >${item.itemTitle}</h2>
                        <p class="description-item-list" data-test="description-item-list"
                        >${item.itemDescription}</p>
                    </figcaption>
                </figure>
            </div>
            `;
        });

        this.containerItem.innerHTML = newHTML;
    }

    // Adicionando novos pontos turísticos.
    addTouristSpots(e) {
        e.preventDefault();

        const itemImageLink = this.spanPreview.children[0].src;
        const itemTitleValue = this.inputTitle.value;
        const itemDescriptionValue = this.inputDescription.value;

        if (
            this.inputFile != "" &&
            this.inputTitle != "" &&
            this.inputDescription.innerHTML != this.spanPreview
        ) {
            const cards = {
                itemImage: itemImageLink,
                itemTitle: itemTitleValue,
                itemDescription: itemDescriptionValue,
            };
            this.list.push(cards);
            this.unSlick();
            this.renderArray();
            this.slick();
            this.clearInput();
        }
    }

    // Limpa os inputs.
    clearInput() {
        this.labelFile.style.display = "flex";
        this.spanPreview.innerHTML = "Imagem";
        this.inputTitle.value = "";
        this.inputDescription.value = "";
    }

    // Remove o carrossel.
    unSlick() {
        if (window.innerWidth > 1024) {
            $(".container-item-list").slick("unslick");
        }
    }

    // Responsável pelo carrossel.
    slick() {
        if (window.innerWidth > 1024) {
            $(".container-item-list").slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                dots: true,
                arrows: true,
            });
        }
    }
}
