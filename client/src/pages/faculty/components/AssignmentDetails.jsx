import FacultyLayout from "../FacultyLayout";
import SubmissionRow from "../components/SubmissionRow";

const AssignmentDetails = () => {
  const submissions = [
    { id: 1, name: "Student A", time: "10:30 AM", file: "file.pdf", marks: null },
    { id: 2, name: "Student B", time: "11:00 AM", file: "image.png", marks: 15 },
  ];

  return (
    <FacultyLayout>
      <h1 className="text-2xl font-semibold mb-4">
        DBMS Assignment 1
      </h1>

      <p className="text-zinc-400 mb-6">
        Submissions: {submissions.length} / 40
      </p>

      <div className="space-y-3">
        {submissions.map(s => (
          <SubmissionRow key={s.id} submission={s} />
        ))}
      </div>
    </FacultyLayout>
  );
};

export default AssignmentDetails;
