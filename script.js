const $ = (s, r=document) => r.querySelector(s)
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s))

const toast = $("#toast")
const toastInner = $("#toastInner")

const showToast = (text) => {
  toastInner.textContent = text
  toast.classList.add("show")
  clearTimeout(showToast._t)
  showToast._t = setTimeout(() => toast.classList.remove("show"), 1400)
}

const copyToClipboard = async (value) => {
  try{
    await navigator.clipboard.writeText(value)
    showToast("Copied")
  }catch{
    const ta = document.createElement("textarea")
    ta.value = value
    ta.setAttribute("readonly","")
    ta.style.position="absolute"
    ta.style.left="-9999px"
    document.body.appendChild(ta)
    ta.select()
    document.execCommand("copy")
    ta.remove()
    showToast("Copied")
  }
}

const bindCopy = (btn, hintEl) => {
  if(!btn) return
  const val = btn.getAttribute("data-copy") || ""
  btn.addEventListener("click", async () => {
    await copyToClipboard(val)
    if(hintEl){
      hintEl.textContent = "Copied"
      clearTimeout(hintEl._t)
      hintEl._t = setTimeout(() => hintEl.textContent = "Copy", 900)
    }
  })
}

bindCopy($("#copyDiscord"), $("#discordHint"))
bindCopy($("#copyEmail2"), $("#emailHint"))
bindCopy($("#copyEmail"))

$("#scrollCta")?.addEventListener("click", () => $("#work")?.scrollIntoView({behavior:"smooth"}))
$("#scrollAbout")?.addEventListener("click", () => $("#about")?.scrollIntoView({behavior:"smooth"}))
$("#scrollWork")?.addEventListener("click", () => $("#work")?.scrollIntoView({behavior:"smooth"}))
$("#scrollContact")?.addEventListener("click", () => $("#contact")?.scrollIntoView({behavior:"smooth"}))

$("#year").textContent = String(new Date().getFullYear())

const revealTargets = [
  ...$$(".heroInner"),
  ...$$(".heroSide"),
  ...$$(".sectionHead"),
  ...$$(".panel"),
  ...$$(".workCard"),
  ...$$(".footer")
].filter(Boolean)

revealTargets.forEach(el => el.classList.add("reveal"))

const io = new IntersectionObserver((entries) => {
  for(const e of entries){
    if(e.isIntersecting) e.target.classList.add("in")
  }
},{threshold:0.12})

revealTargets.forEach(el => io.observe(el))

const syncContactLinks = () => {
  const email = $("#emailVal")?.textContent?.trim() || ""
  const mailto = $("#mailtoLink")
  const topCopy = $("#copyEmail")
  const copy2 = $("#copyEmail2")
  if(mailto && email) mailto.setAttribute("href", `mailto:${email}`)
  if(topCopy && email) topCopy.setAttribute("data-copy", email)
  if(copy2 && email) copy2.setAttribute("data-copy", email)
}
syncContactLinks()
