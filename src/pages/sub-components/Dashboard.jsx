import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { clearSkillErrors } from "@/store/slices/skillSlice";
import {
  clearAllSoftwareAppErrors,
  deleteSoftwareApplication,
  getAllSoftwareApplications,
  resetSoftwareApplicationSlice,
} from "@/store/slices/softwareApplicationSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { clearAllTimelineErrors } from "@/store/slices/timelineSlice";
import { clearAllProjectErrors } from "@/store/slices/projectSlice";
import { FaTrashAlt } from "react-icons/fa";

const proficiencyToColor = {
  Beginner: "bg-yellow-500",
  Intermediate: "bg-blue-500",
  Advanced: "bg-green-500",
  Expert: "bg-purple-500",
};

const proficiencyToPercentage = {
  Beginner: 25,
  Intermediate: 50,
  Advanced: 75,
  Expert: 100,
};

const Dashboard = () => {
  const navigateTo = useNavigate();
  const gotoManageSkills = () => navigateTo("/manage/skills");
  const gotoManageTimeline = () => navigateTo("/manage/timeline");
  const gotoManageProjects = () => navigateTo("/manage/projects");

  const { user } = useSelector((state) => state.user);
  const {
    skills,
    loading: skillLoading,
    error: skillError,
    message: skillMessage,
  } = useSelector((state) => state.skills);
  const {
    softwareApplications,
    loading: appLoading,
    error: appError,
    message: appMessage,
  } = useSelector((state) => state.softwareApplications);

  const {
    timeline,
    loading: timelineLoading,
    error: timelineError,
    message: timelineMessage,
  } = useSelector((state) => state.timeline);

  const {
    projects,
    error: projectError,
    message: projectMessage,
    loading: projectLoading,
  } = useSelector((state) => state.projects);
  console.log("projects", projects);

  const [appId, setAppId] = useState(null);

  const dispatch = useDispatch();

  const handleDeleteSoftwareApp = (id) => {
    setAppId(id);
    dispatch(deleteSoftwareApplication(id));
  };

  useEffect(() => {
    if (skillError) {
      toast.error(skillError);
      dispatch(clearSkillErrors());
    }

    if (appError) {
      toast.error(appError);
      dispatch(clearAllSoftwareAppErrors());
    }
    if (projectError) {
      toast.error(projectError);
      dispatch(clearAllProjectErrors());
    }
    if (appMessage) {
      toast.success(appMessage);
      setAppId(null);
      dispatch(resetSoftwareApplicationSlice());
      dispatch(getAllSoftwareApplications());
    }
    if (timelineError) {
      toast.error(timelineError);
      dispatch(clearAllTimelineErrors());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    skillError,
    skillLoading,
    skillMessage,
    appError,
    appLoading,
    appMessage,
    projectError,
    projectLoading,
    projectMessage,
    timelineError,
    timelineLoading,
    timelineMessage,
  ]);

  // Transform skills data to ensure proficiency is a string
  const transformedSkills = skills?.data?.map((skill) => ({
    ...skill,
    proficiency: skill.proficiency.toString(), // Convert proficiency to string
  }));

  return (
    <>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="flex flex-col sm:col-span-2 justify-between bg-gradient-to-r from-teal-400 to-cyan-500 text-white shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <CardHeader className="pb-3">
                  <CardDescription className="max-w-lg text-black text-base font-bold leading-relaxed">
                    {user.aboutme}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link
                    to={"https://epsilen-portfolio.netlify.app"}
                    target="_blank"
                  >
                    <Button>Visit Portfolio</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="flex flex-col justify-center bg-blue-100">
                <CardHeader className="pb-2">
                  <CardTitle>Projects Completed</CardTitle>
                  <CardTitle className="text-6xl text-blue-700">
                    {projects && projects?.data?.data?.length}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button onClick={gotoManageProjects}>Manage Projects</Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col justify-center bg-green-100">
                <CardHeader className="pb-2">
                  <CardTitle>Skills</CardTitle>
                  <CardTitle className="text-6xl text-green-700">
                    {skills && skills?.data?.length}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button onClick={gotoManageSkills}>Manage Skills</Button>
                </CardFooter>
              </Card>
            </div>
            <Tabs>
              <TabsContent>
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Stack
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Deployed
                          </TableHead>
                          <TableHead className="md:table-cell">
                            Update
                          </TableHead>
                          <TableHead className="text-right">Visit</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects && projects?.data?.data?.length ? (
                          projects.data.data.map((element) => (
                            <TableRow key={element._id}>
                              <TableCell>
                                <div className="font-medium">
                                  {element.title}
                                </div>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {element.stack}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                <Badge className="text-xs" variant="secondary">
                                  {element.deployed}
                                </Badge>
                              </TableCell>
                              <TableCell className="md:table-cell">
                                <Link to={`/update/project/${element._id}`}>
                                  <Button>Update</Button>
                                </Link>
                              </TableCell>
                              <TableCell className="text-right">
                                <Link
                                  to={
                                    element.deployementlink &&
                                    element.deployementlink !== "No"
                                      ? element.deployementlink
                                      : "#"
                                  }
                                  target="_blank"
                                >
                                  <Button>Visit</Button>
                                </Link>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell className="text-3xl overflow-y-hidden">
                              You have not added any project.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent>
                <Card>
                  <CardHeader className="px-7 gap-3">
                    <CardTitle>Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="grid sm:grid-cols-2 gap-4">
                    {transformedSkills && transformedSkills?.length > 0 ? (
                      transformedSkills.map((element) => (
                        <Card
                          key={element._id}
                          className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden"
                        >
                          <div className="p-4">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-semibold text-lg">
                                {element.title}
                              </span>
                            </div>
                            <Badge
                              className={`${
                                proficiencyToColor[element.proficiency] ||
                                "bg-gray-200"
                              }`}
                            >
                              {element.proficiency}
                            </Badge>
                          </div>
                          <div className="px-4 py-2">
                            <Progress
                              value={
                                proficiencyToPercentage[element.proficiency] ||
                                0
                              }
                              className={`h-2 rounded-full ${
                                proficiencyToColor[element.proficiency] ||
                                "bg-gray-200"
                              }`}
                            />
                          </div>
                        </Card>
                      ))
                    ) : (
                      <p className="text-3xl">You have not added any skill.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent className="grid min-[1050px]:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Software Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead className="md:table-cell">Icon</TableHead>
                          <TableHead className="md:table-cell text-center">
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {softwareApplications &&
                        softwareApplications?.data?.length > 0 ? (
                          softwareApplications.data.map((element) => (
                            <TableRow key={element._id}>
                              <TableCell className="font-medium">
                                {element.name}
                              </TableCell>
                              <TableCell className="md:table-cell">
                                <img
                                  className="w-7 h-7"
                                  src={element.svg && element.svg.url}
                                  alt={element.name}
                                />
                              </TableCell>
                              <TableCell className="md:table-cell text-center">
                                {appLoading && appId === element._id ? (
                                  <SpecialLoadingButton
                                    content={"Deleting"}
                                    width={"w-fit"}
                                  />
                                ) : (
                                  <Button
                                    onClick={() =>
                                      handleDeleteSoftwareApp(element._id)
                                    }
                                    className="bg-red-600 hover:bg-red-700 text-white"
                                  >
                                    <FaTrashAlt />
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell className="text-3xl overflow-y-hidden">
                              You have not added any software applications.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="px-7 flex items-center justify-between flex-row">
                    <CardTitle>Timeline</CardTitle>
                    <Button onClick={gotoManageTimeline} className="w-fit">
                      Manage Timeline
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="md:table-cell">From</TableHead>
                          <TableHead className="md:table-cell text-right">
                            To
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timeline && timeline?.data?.length > 0 ? (
                          timeline.data.map((element) => (
                            <TableRow key={element._id}>
                              <TableCell className="font-medium">
                                {element.title}
                              </TableCell>
                              <TableCell className="md:table-cell">
                                {element.timeline.from}
                              </TableCell>
                              <TableCell className="md:table-cell text-right">
                                {element.timeline.to}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell className="text-3xl overflow-y-hidden">
                              You have not added any timeline.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
