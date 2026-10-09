import { Link } from "react-router";
import { motion } from "framer-motion";
import { IoArrowForwardOutline } from "react-icons/io5";
import Button from "../reuseabble/Button";
const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop";

const LoanCard = ({ loan }) => {
  const { _id, title, category, photoUrl, interestRate, maxLimit, emiPlans } =
    loan ?? {};

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex h-full flex-col overflow-hidden rounded-md border border-app-border-subtle bg-app-surface shadow-card transition-shadow hover:shadow-card-hover"
    >
      <figure className="aspect-[16/9] overflow-hidden">
        <img
          src={photoUrl || FALLBACK_IMG}
          alt={title ? `${title} loan` : "Loan"}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </figure>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <header className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-app-text-muted">
            {category}
          </p>
          <h3 className="text-xl font-bold leading-tight text-app-text">
            {title}
          </h3>
        </header>

        <dl className="grid grid-cols-3 gap-3 text-sm">
          <div>
            <dt className="text-app-text-muted">APR</dt>
            <dd className="font-semibold text-app-text">{interestRate}%</dd>
          </div>
          <div>
            <dt className="text-app-text-muted">Max limit</dt>
            <dd className="font-semibold text-app-text">
              ${maxLimit?.toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className="text-app-text-muted">Duration</dt>
            <dd className="font-semibold text-app-text">{emiPlans} months</dd>
          </div>
        </dl>

        <Link className="flex items-center" to={`/loanDeatail/${_id}`}>
          <Button className="group relative overflow-hidden flex items-center gap-2 bg-primary text-primary-content hover:bg-primary-focus cursor-pointer">
            <span className="relative z-10">Explore loan</span>

            <IoArrowForwardOutline
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            />

            <span
              aria-hidden="true"
              className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-current transition-all duration-300 group-hover:left-4 group-hover:w-[calc(100%-2rem)]"
            />
          </Button>
        </Link>
      </div>
    </motion.article>
  );
};

export default LoanCard;
