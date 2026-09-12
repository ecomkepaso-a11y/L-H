import { useState } from 'react';
import { api } from '../api';
import { CheckCircle2, Loader2, User, Phone, Users, MessageSquare, ArrowRight, ArrowLeft, Shirt } from 'lucide-react';
import { couple, events } from '../weddingConfig';

const initialForm = {
  fullName: '',
  phone: '',
  ceremonies: [],
  guests: 1,
  message: '',
  wantsPagne: null, // 'oui' | 'non' | null — only relevant if the traditional ceremony is selected
};

export default function RSVP() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const totalSteps = 2;

  function updateField(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
    setFieldErrors((e) => ({ ...e, [key]: undefined }));
  }

  function toggleCeremony(id) {
    setForm((f) => {
      const nowSelected = f.ceremonies.includes(id)
        ? f.ceremonies.filter((c) => c !== id)
        : [...f.ceremonies, id];
      return {
        ...f,
        ceremonies: nowSelected,
        // Reset the pagne choice if the traditional ceremony gets unchecked
        wantsPagne: nowSelected.includes('traditionnel') ? f.wantsPagne : null,
      };
    });
    setFieldErrors((e) => ({ ...e, ceremonies: undefined, wantsPagne: undefined }));
  }

  function setWantsPagne(value) {
    setForm((f) => ({ ...f, wantsPagne: value }));
    setFieldErrors((e) => ({ ...e, wantsPagne: undefined }));
  }

  function validateStep1() {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = 'Merci de renseigner votre nom complet.';
    if (!form.phone.trim()) errs.phone = 'Merci de renseigner votre numéro de téléphone.';
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function validateStep2() {
    const errs = {};
    if (form.ceremonies.length === 0) errs.ceremonies = 'Sélectionnez au moins une cérémonie.';
    if (!form.guests || form.guests < 1) errs.guests = 'Le nombre d\u2019invités doit être au moins 1.';
    if (form.ceremonies.includes('traditionnel') && !form.wantsPagne) {
      errs.wantsPagne = 'Merci de préciser si vous souhaitez porter le pagne.';
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function goNext() {
    if (validateStep1()) setStep(2);
  }

  function goBack() {
    setStep(1);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateStep2()) return;

    setStatus('loading');
    setErrorMsg('');
    try {
      await api.post('/api/rsvp', form);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err?.response?.data?.message || 'Une erreur est survenue. Merci de réessayer dans un instant.'
      );
    }
  }

  if (status === 'success') {
    return (
      <section id="rsvp" className="relative bg-espresso px-6 py-24 sm:px-10">
        <div className="mx-auto flex max-w-md flex-col items-center rounded-3xl border border-gold/25 bg-espresso-soft p-10 text-center shadow-2xl">
          <CheckCircle2 size={48} className="text-gold-light" />
          <h3 className="mt-6 font-display text-2xl text-cream">Merci, {form.fullName.split(' ')[0]} !</h3>
          <p className="mt-3 text-cream/80">
            Votre confirmation a bien été envoyée. Nous avons hâte de célébrer ce moment avec vous.
          </p>
          <button
            type="button"
            onClick={() => {
              setForm(initialForm);
              setStep(1);
              setStatus('idle');
            }}
            className="mt-8 font-label text-xs uppercase tracking-[0.2em] text-gold-light underline underline-offset-4 hover:text-gold"
          >
            Envoyer une autre réponse
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="relative overflow-hidden bg-espresso px-6 py-24 sm:px-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(circle at 15% 15%, rgba(232,200,116,0.18), transparent 45%), radial-gradient(circle at 85% 80%, rgba(201,152,47,0.16), transparent 40%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-md text-center">
        <p className="font-label text-xs uppercase tracking-[0.3em] text-gold-light/80">Confirmez votre présence</p>
        <h2 className="mt-3 font-display text-4xl text-cream">RSVP</h2>
        <p className="mt-3 font-script text-2xl text-gold-light">Avant le {couple.rsvpDeadline}</p>

        {/* Step indicator */}
        <div className="mt-8 flex items-center justify-center gap-3">
          {[1, 2].map((n) => (
            <span
              key={n}
              className={`flex h-9 w-9 items-center justify-center rounded-full font-label text-sm transition-colors ${
                n <= step ? 'gold-gradient-btn text-espresso' : 'border border-gold/30 text-cream/60'
              }`}
            >
              {n}
            </span>
          ))}
        </div>

        <form
          onSubmit={step === totalSteps ? handleSubmit : (e) => { e.preventDefault(); goNext(); }}
          className="mt-10 rounded-3xl border border-gold/20 bg-espresso-soft/70 p-7 text-left shadow-2xl backdrop-blur-sm sm:p-9"
        >
          {step === 1 && (
            <div className="flex flex-col gap-5">
              <Field
                label="Nom complet"
                icon={User}
                error={fieldErrors.fullName}
              >
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  placeholder="Votre nom & prénom"
                  className={inputClasses(fieldErrors.fullName)}
                />
              </Field>

              <Field label="Téléphone" icon={Phone} error={fieldErrors.phone}>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="+237 6XX XXX XXX"
                  className={inputClasses(fieldErrors.phone)}
                />
              </Field>

              <button
                type="submit"
                className="gold-gradient-btn mt-3 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-label text-xs font-medium uppercase tracking-[0.2em] text-espresso shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.99]"
              >
                Continuer <ArrowRight size={16} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-5">
              <Field label="Cérémonies auxquelles vous assisterez" error={fieldErrors.ceremonies}>
                <div className="flex flex-col gap-2.5">
                  {events.map((ev) => (
                    <label
                      key={ev.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                        form.ceremonies.includes(ev.id)
                          ? 'border-gold bg-gold/10'
                          : 'border-cream/15 bg-transparent hover:border-gold/40'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.ceremonies.includes(ev.id)}
                        onChange={() => toggleCeremony(ev.id)}
                        className="h-4 w-4 accent-[#c9982f]"
                      />
                      <span className="text-sm text-cream/90">
                        {ev.title} <span className="text-cream/50">— {ev.dateLong}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </Field>

              {form.ceremonies.includes('traditionnel') && (
                <Field
                  label="Souhaitez-vous porter le pagne officiel ?"
                  icon={Shirt}
                  error={fieldErrors.wantsPagne}
                >
                  <p className="mb-2.5 text-xs text-cream/55">
                    Un pagne assorti sera disponible pour la cérémonie traditionnelle.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'oui', label: 'Oui, je veux le pagne' },
                      { value: 'non', label: 'Non, merci' },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setWantsPagne(opt.value)}
                        className={`rounded-xl border px-4 py-3 text-sm transition-colors ${
                          form.wantsPagne === opt.value
                            ? 'border-gold bg-gold/10 text-cream'
                            : 'border-cream/15 text-cream/80 hover:border-gold/40'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </Field>
              )}

              <Field label="Nombre d'invités (vous inclus)" icon={Users} error={fieldErrors.guests}>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={form.guests}
                  onChange={(e) => updateField('guests', Number(e.target.value))}
                  className={inputClasses(fieldErrors.guests)}
                />
              </Field>

              <Field label="Message (optionnel)" icon={MessageSquare}>
                <textarea
                  value={form.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  placeholder="Un mot pour les mariés, une allergie alimentaire..."
                  rows={3}
                  className={inputClasses() + ' resize-none'}
                />
              </Field>

              {status === 'error' && (
                <p className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                  {errorMsg}
                </p>
              )}

              <div className="mt-1 flex gap-3">
                <button
                  type="button"
                  onClick={goBack}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-cream/20 px-6 py-3.5 font-label text-xs uppercase tracking-[0.2em] text-cream/80 transition-colors hover:border-gold/50 hover:text-cream"
                >
                  <ArrowLeft size={16} /> Retour
                </button>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="gold-gradient-btn flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 font-label text-xs font-medium uppercase tracking-[0.2em] text-espresso shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.99] disabled:opacity-70"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Envoi...
                    </>
                  ) : (
                    'Confirmer'
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({ label, icon: Icon, error, children }) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.2em] text-cream/60">
        {Icon && <Icon size={13} />}
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-300">{error}</p>}
    </div>
  );
}

function inputClasses(error) {
  return `w-full rounded-xl border bg-cream/5 px-4 py-3 text-[15px] text-cream placeholder:text-cream/35 outline-none transition-colors focus:border-gold focus:bg-cream/10 ${
    error ? 'border-red-400/60' : 'border-cream/15'
  }`;
}
