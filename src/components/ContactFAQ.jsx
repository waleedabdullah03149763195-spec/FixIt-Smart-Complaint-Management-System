import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'What is FixIt?',
    answer:
      'FixIt is a smart complaint and maintenance management system that helps campuses report issues, assign technicians, and track resolutions in one organized platform.',
  },
  {
    question: 'How can I report a complaint?',
    answer:
      'Create an account or sign in, then use the Report an Issue option to submit details about the maintenance problem you want resolved.',
  },
  {
    question: 'Can I track my complaint?',
    answer:
      'Yes. After submitting a request, you can track its progress as it moves from review and assignment to completion.',
  },
  {
    question: 'Who handles maintenance requests?',
    answer:
      'Admins review incoming complaints and assign them to technicians. Managers can also monitor performance and overall service quality.',
  },
]

function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggleFaq = (index) => {
    setOpenIndex((current) => (current === index ? -1 : index))
  }

  return (
    <section className="section contact-faq">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">FAQ</p>
          <h2 className="section-title">Frequently asked questions</h2>
          <p className="section-subtitle">
            Quick answers about how FixIt works and how you can get support.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <article
                key={faq.question}
                className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-item__button"
                  aria-expanded={isOpen}
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown size={20} className="faq-item__icon" />
                </button>
                {isOpen && <p className="faq-item__answer">{faq.answer}</p>}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ContactFAQ
