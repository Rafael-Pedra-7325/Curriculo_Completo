const pages = [...document.querySelectorAll("[data-page]")];
const routeLinks = [...document.querySelectorAll("[data-route]")];
const nav = document.querySelector(".main-nav");
const menuButton = document.querySelector(".menu-button");
const toast = document.querySelector(".toast");

const cidadesData = [
  { cidade: "São Paulo", denuncias: 3245 },
  { cidade: "Rio de Janeiro", denuncias: 2180 },
  { cidade: "Belo Horizonte", denuncias: 1560 },
  { cidade: "Brasília", denuncias: 1320 },
  { cidade: "Curitiba", denuncias: 980 },
  { cidade: "Porto Alegre", denuncias: 850 },
  { cidade: "Salvador", denuncias: 720 },
  { cidade: "Fortaleza", denuncias: 688 }
];

const infracoesData = [
  { tipo: "Estacionamento Irregular", total: 4250, cor: "#D9A679" },
  { tipo: "Excesso de Velocidade", total: 3180, cor: "#A67246" },
  { tipo: "Avanço de Sinal", total: 2340, cor: "#0E2440" },
  { tipo: "Uso de Celular", total: 1890, cor: "#091626" },
  { tipo: "Outros", total: 883, cor: "#666666" }
];

function showPage(hash) {
  const targetId = (hash || "#inicio").replace("#", "");
  const target = pages.find((page) => page.id === targetId) || pages[0];

  pages.forEach((page) => page.classList.toggle("is-active", page === target));
  routeLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${target.id}`;
    link.classList.toggle("is-active", isActive);
  });

  nav?.classList.remove("is-open");
  menuButton?.setAttribute("aria-expanded", "false");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function renderCharts() {
  const barChart = document.querySelector(".bar-chart");
  const list = document.querySelector(".infractions-list");
  if (!barChart || !list) return;

  const maxDenuncias = Math.max(...cidadesData.map((item) => item.denuncias));

  barChart.innerHTML = cidadesData.map((item) => {
    const height = Math.round((item.denuncias / maxDenuncias) * 100);
    return `
      <div class="bar-item">
        <span class="bar-value">${item.denuncias.toLocaleString("pt-BR")}</span>
        <span class="bar" style="height:${height}%"></span>
        <span class="bar-label">${item.cidade}</span>
      </div>
    `;
  }).join("");

  const total = infracoesData.reduce((acc, item) => acc + item.total, 0);

  list.innerHTML = infracoesData.map((item) => {
    const percent = (item.total / total) * 100;
    return `
      <div class="infraction-row">
        <div class="infraction-head">
          <span><i class="color-dot" style="background:${item.cor}"></i>${item.tipo}</span>
          <strong>${item.total.toLocaleString("pt-BR")}</strong>
        </div>
        <div class="progress"><span style="background:${item.cor}; width:${percent}%"></span></div>
      </div>
    `;
  }).join("");
}

function validateField(field) {
  const error = field.parentElement.querySelector(".error");
  if (!error) return true;

  error.textContent = "";
  field.setAttribute("aria-invalid", "false");

  if (field.validity.valueMissing) {
    error.textContent = "Preencha este campo.";
    field.setAttribute("aria-invalid", "true");
    return false;
  }

  if (field.validity.tooShort) {
    error.textContent = `Digite pelo menos ${field.minLength} caracteres.`;
    field.setAttribute("aria-invalid", "true");
    return false;
  }

  if (field.validity.rangeOverflow) {
    error.textContent = "A data não pode ser no futuro.";
    field.setAttribute("aria-invalid", "true");
    return false;
  }

  if (field.validity.typeMismatch) {
    error.textContent = "Digite um valor válido.";
    field.setAttribute("aria-invalid", "true");
    return false;
  }

  return true;
}

function setupForm() {
  const form = document.querySelector(".report-form");
  if (!form) return;

  const successBox = document.querySelector(".success-box");
  const protocol = document.querySelector(".protocol");
  const anonymous = form.elements.anonima;
  const personalData = document.querySelector(".personal-data");
  const fileInput = form.elements.arquivo;
  const fileName = document.querySelector(".file-name");
  const uploadTitle = document.querySelector(".upload-title");
  const dateField = form.elements.data;
  const fields = [...form.querySelectorAll("input:not([type='file']):not([type='checkbox']), select, textarea")];

  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  dateField.max = today.toISOString().slice(0, 10);

  anonymous.addEventListener("change", () => {
    personalData.classList.toggle("is-hidden", anonymous.checked);
  });

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      fileInput.value = "";
      uploadTitle.textContent = "Clique para selecionar um arquivo";
      fileName.textContent = "O arquivo precisa ter até 10MB.";
      showToast("O arquivo selecionado passa de 10MB.");
      return;
    }

    uploadTitle.textContent = "Arquivo selecionado";
    fileName.textContent = file.name;
    showToast(`Arquivo "${file.name}" selecionado.`);
  });

  fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => validateField(field));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const isValid = fields.map(validateField).every(Boolean);
    if (!isValid) {
      showToast("Confira os campos obrigatórios antes de enviar.");
      return;
    }

    protocol.textContent = `Protocolo: #MBR-${Math.floor(10000 + Math.random() * 90000)}`;
    form.hidden = true;
    successBox.hidden = false;
    showToast("Denúncia registrada com sucesso!");

    setTimeout(() => {
      form.reset();
      fields.forEach((field) => {
        field.setAttribute("aria-invalid", "false");
        const error = field.parentElement.querySelector(".error");
        if (error) error.textContent = "";
      });
      uploadTitle.textContent = "Clique para selecionar um arquivo";
      fileName.textContent = "PNG, JPG, MP4 até 10MB";
      personalData.classList.remove("is-hidden");
      successBox.hidden = true;
      form.hidden = false;
    }, 3200);
  });
}

function setupActionButtons() {
  document.querySelectorAll(".plan-card button, .panel-button, .cta-panel button").forEach((button) => {
    button.addEventListener("click", () => {
      showToast("Este botão está pronto para receber o link ou integração final.");
    });
  });
}

menuButton?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

routeLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const hash = link.getAttribute("href");
    history.pushState(null, "", hash);
    showPage(hash);
  });
});

window.addEventListener("popstate", () => showPage(location.hash));

renderCharts();
setupForm();
setupActionButtons();
showPage(location.hash);
