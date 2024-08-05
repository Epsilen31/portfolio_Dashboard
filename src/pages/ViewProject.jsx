import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";

const ViewProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(
          `https://portfolio-backend-1mty.onrender.com/api/v1/project/getSingleProject/${id}`,
          { withCredentials: true }
        );
        console.log("res", res);
        const data = res.data.data;

        setTitle(data.title);
        setDescription(data.description || "");
        setStack(data.stack || "");
        setDeployed(data.deployed || "");
        setTechnologies(data.technologyStack || []); // Ensure technologies is always an array
        setGitRepoLink(data.githublink || "");
        setProjectLink(data.deployementlink || ""); // Note: Changed to deployementlink
        setProjectBanner(data.projectBanner?.url || "");
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching project");
      }
    };
    getProject();
  }, [id]);

  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  // Directly use technologies as an array
  const descriptionList = (description || "").split(".");
  const technologiesList = technologies;

  return (
    <>
      <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
        <div className="w-[100%] px-5 md:w-[1000px] pb-5">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="flex justify-end">
                <Button onClick={handleReturnToDashboard}>
                  Return to Dashboard
                </Button>
              </div>
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <h1 className="text-2xl font-bold mb-4">{title}</h1>
                  <img
                    src={projectBanner ? projectBanner : "/avatarHolder.jpg"}
                    alt="Project Banner"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Description:</p>
                  <ul className="list-disc ml-6 space-y-2">
                    {descriptionList.map((item, index) => (
                      <li key={index} className="text-lg">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Technologies:</p>
                  <ul className="list-disc ml-6 space-y-2">
                    {technologiesList.map((item, index) => (
                      <li key={index} className="text-lg">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Stack:</p>
                  <p>{stack}</p>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Deployed:</p>
                  <p>{deployed}</p>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Github Repository Link:</p>
                  <Link
                    className="text-sky-700 text-lg underline"
                    target="_blank"
                    to={gitRepoLink}
                  >
                    {gitRepoLink}
                  </Link>
                </div>
                {deployed === "Yes" && (
                  <div className="w-full sm:col-span-4">
                    <p className="text-2xl mb-2">Project Link:</p>
                    <Link
                      className="text-sky-700 text-lg underline"
                      target="_blank"
                      to={projectLink}
                    >
                      {projectLink}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProject;
